
'use server';

/**
 * @fileOverview This file defines a Genkit flow for enhancing UI component prompts.
 *
 * The flow takes a user's basic prompt and rewrites it to be more descriptive,
 * focusing on modern, professional, and futuristic design aesthetics.
 *
 * @exports `enhancePrompt` - The main function to call for prompt enhancement.
 * @exports `EnhancePromptInput` - The input type for the `enhancePrompt` function.
 * @exports `EnhancePromptOutput` - The output type for the `enhancePrompt` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePromptInputSchema = z.object({
  user_prompt: z.string().describe('The user-provided prompt for a UI component.'),
  framework: z.enum(['react', 'vue', 'svelte', 'html']).default('react'),
  styling: z.enum(['tailwind', 'shadcn', 'css-modules']).default('tailwind'),
  tone: z.enum(['minimal', 'futuristic', 'playful']).default('futuristic'),
});
export type EnhancePromptInput = z.infer<typeof EnhancePromptInputSchema>;

const EnhancePromptOutputSchema = z.object({
  enhanced_prompt: z.string().describe('The polished, detailed build prompt.'),
  acceptance_criteria: z.array(z.string()).describe('An array of acceptance criteria.'),
  design_tokens: z.object({
    color: z.record(z.string()).optional(),
    radius: z.string().optional(),
    shadow: z.string().optional(),
    spacing: z.string().optional(),
    font: z.record(z.string()).optional(),
  }).describe('The suggested design tokens.'),
});
export type EnhancePromptOutput = z.infer<typeof EnhancePromptOutputSchema>;

export async function enhancePrompt(
  input: Omit<EnhancePromptInput, 'framework' | 'styling' | 'tone'>
): Promise<EnhancePromptOutput> {
  const fullInput: EnhancePromptInput = {
    ...input,
    framework: 'react',
    styling: 'tailwind',
    tone: 'futuristic',
  };
  return enhancePromptFlow(fullInput);
}

const enhancePromptTemplate = ai.definePrompt({
  name: 'enhancePromptTemplate',
  input: {schema: EnhancePromptInputSchema},
  output: {schema: EnhancePromptOutputSchema},
  system: `SYSTEM: GenUI.EnhancePrompt
ROLE: You rewrite a basic or vague UI request into a sharp, industry-standard, futuristic prompt that consistently produces premium UI.

RULES:
1) Preserve the original intent; enrich with: layout, visual hierarchy, tokens (colors/radii/shadows/spacing), component states, responsiveness, a11y, and testable acceptance criteria.
2) Reference modern patterns (ShadCN/Radix semantics, WCAG AA contrast, keyboard navigation).
3) Prefer semantic HTML and composable components.
4) Include optional motion guidance but keep it subtle by default.
5) Output JSON only.
6) No explanations.`,
  prompt: `Based on the following user request, generate the required JSON output.

User Request:
"{{{user_prompt}}}"
`,
});

const enhancePromptFlow = ai.defineFlow(
  {
    name: 'enhancePromptFlow',
    inputSchema: EnhancePromptInputSchema,
    outputSchema: EnhancePromptOutputSchema,
  },
  async input => {
    const {output} = await enhancePromptTemplate(input);
    if (!output) {
      throw new Error("Failed to generate enhanced prompt.");
    }
    return output;
  }
);
