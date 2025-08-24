
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
  prompt: z.string().describe('The user-provided prompt for a UI component.'),
});
export type AnimatePromptInput = z.infer<typeof AnimatePromptInputSchema>;

const AnimatePromptOutputSchema = z.object({
  enhancedPrompt: z
    .string()
    .describe('The AI-enhanced prompt with detailed animation and interaction specifications.'),
});
export type AnimatePromptOutput = z.infer<typeof AnimatePromptOutputSchema>;

export async function animatePrompt(
  input: AnimatePromptInput
): Promise<AnimatePromptOutput> {
  return animatePromptFlow(input);
}

const animatePromptTemplate = ai.definePrompt({
  name: 'animatePromptTemplate',
  input: {schema: AnimatePromptInputSchema},
  output: {schema: AnimatePromptOutputSchema},
  prompt: `You are a specialist in UI/UX motion design. Your task is to take a user's prompt for a UI component and enhance it by adding detailed descriptions of sleek, modern, and industry-standard animations and micro-interactions.

Rewrite the following prompt, integrating fluid animations that enhance the user experience.

- **Focus on Purpose**: Animations should be meaningful. Describe loading states, transitions, hover effects, and feedback animations.
- **Be Specific**: Mention properties like timing (e.g., 'a quick 200ms ease-out transition'), property changes (e.g., 'background color fades in'), and transform effects (e.g., 'scales up slightly on hover').
- **Modern Aesthetics**: The animations should feel professional, smooth, and non-intrusive. Think subtle, not flashy.

Original Prompt:
"{{{prompt}}}"

Rewrite the prompt into a single, cohesive paragraph that seamlessly blends the original request with your animation and interaction design expertise. Do not use lists or bullet points. Your response must only be the enhanced prompt itself.
`,
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
    // Ensure the output matches the schema exactly.
    return { enhancedPrompt: output.enhancedPrompt };
  }
);
