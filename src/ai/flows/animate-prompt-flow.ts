
'use server';

/**
 * @fileOverview This file defines a Genkit flow for enhancing UI component prompts with animation details.
 *
 * The flow takes a user's basic prompt and rewrites it to include descriptions
 * of sleek, modern, and industry-standard animations and micro-interactions.
 *
 * @exports `animatePrompt` - The main function to call for animation enhancement.
 * @exports `AnimatePromptInput` - The input type for the `animatePrompt` function.
 * @exports `AnimatePromptOutput` - The output type for the `animatePrompt` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimatePromptInputSchema = z.object({
  user_prompt: z.string().describe('The user-provided prompt for a UI component.'),
  library: z.enum(['framer-motion', 'css']).default('framer-motion'),
  motion_level: z.enum(['subtle', 'balanced', 'rich']).default('balanced'),
  respect_reduced_motion: z.boolean().default(true),
});
export type AnimatePromptInput = z.infer<typeof AnimatePromptInputSchema>;

const AnimatePromptOutputSchema = z.object({
  enhanced_prompt: z
    .string()
    .describe('The final build prompt including animation requirements'),
  animation_spec: z.object({
    principles: z.array(z.string()).describe('The animation principles applied.'),
    tokens: z.record(z.any()).describe('The timing and easing tokens.'),
    patterns: z.array(z.record(z.any())).describe('The specific animation patterns for elements.'),
  })
});
export type AnimatePromptOutput = z.infer<typeof AnimatePromptOutputSchema>;

export async function animatePrompt(
  input: Omit<AnimatePromptInput, 'library' | 'motion_level' | 'respect_reduced_motion'>
): Promise<AnimatePromptOutput> {
  // Use default values for the flow
  const fullInput: AnimatePromptInput = {
    ...input,
    library: 'framer-motion',
    motion_level: 'balanced',
    respect_reduced_motion: true,
  };
  return animatePromptFlow(fullInput);
}

const animatePromptTemplate = ai.definePrompt({
  name: 'animatePromptTemplate',
  input: {schema: AnimatePromptInputSchema},
  output: {schema: AnimatePromptOutputSchema},
  system: `SYSTEM: GenUI.AnimatePrompt
ROLE: You transform a plain UI prompt into an animation-aware prompt that yields tasteful, accessible motion.

RULES:
1) Keep the user’s intent intact; **add** motion specs, don’t rewrite functionality.
2) Define motion for: mount/unmount, hover/focus/press, list reordering, modal/drawer, toast, and page transitions—only when relevant.
3) Specify timing (easing, duration ms, stagger), origins, and interactive micro-interactions.
4) Include accessibility notes: respect \`prefers-reduced-motion\`, maintain focus visibility, avoid motion that impairs readability.
5) Output JSON only.
6) No extra commentary.`,
  prompt: `user_prompt: {{{user_prompt}}}`,
});

const animatePromptFlow = ai.defineFlow(
  {
    name: 'animatePromptFlow',
    inputSchema: AnimatePromptInputSchema,
    outputSchema: AnimatePromptOutputSchema,
  },
  async input => {
    const {output} = await animatePromptTemplate(input);
    if (!output) {
      throw new Error("Failed to generate animated prompt.");
    }
    return output;
  }
);
