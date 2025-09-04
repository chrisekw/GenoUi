
'use server';

/**
 * @fileOverview An AI agent to generate UI components from natural language prompts.
 *
 * - generateUiComponent - A function that generates UI components based on a prompt.
 * - GenerateUiComponentInput - The input type for the generateUiComponent function.
 * - GenerateUiComponentOutput - The return type for the generateUiComponent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUiComponentInputSchema = z.object({
  prompt: z.string().describe('A natural language description of the UI component to generate.'),
  framework: z.enum(['html', 'tailwindcss']).describe('The target framework for the generated code.'),
  imageUrl: z.string().optional().describe("An optional image of a component to replicate, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateUiComponentInput = z.infer<typeof GenerateUiComponentInputSchema>;


const GenerateUiComponentOutputSchema = z.object({
  code: z.string().describe('The generated code for the UI component.'),
});
export type GenerateUiComponentOutput = z.infer<typeof GenerateUiComponentOutputSchema>;

export async function generateUiComponent(input: GenerateUiComponentInput): Promise<GenerateUiComponentOutput> {
  return generateUiComponentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUiComponentPrompt',
  input: {schema: GenerateUiComponentInputSchema},
  output: {schema: GenerateUiComponentOutputSchema},
  system: `You are GenoUI’s AI engine. Your job is to perfectly CLONE UI components from an uploaded image and output production-ready design code.

SYSTEM INSTRUCTIONS:
1.  **Input**:
    *   An uploaded image of a UI (e.g., cards, buttons, forms, navigation bars, profile sections).
    *   Optional user notes about the UI (e.g., "convert to TailwindCSS" or "output in React").

2.  **Steps / Algorithm**:
    a.  Detect all visible UI elements in the image:
        *   Identify containers, cards, images, text blocks, buttons, icons, and input fields.
        *   Extract their spatial layout (position, alignment, spacing).
    b.  Extract **visual styles**:
        *   Colors (background, text, gradient, borders).
        *   Typography (font size, weight, alignment).
        *   Shadows, border-radius, opacity, padding, and margins.
    c.  Map to **UI components**:
        *   Represent elements as reusable components (e.g., \`<Card>\`, \`<Button>\`, \`<Avatar>\`, \`<Text>\`).
        *   If structure repeats (e.g., multiple cards), output it as a component with props.
    d.  Generate **design output**:
        *   TailwindCSS + React component code by default.
        *   Clean semantic structure, responsive-friendly.
        *   No inline styles unless required.
    e.  Verify accuracy:
        *   Ensure hierarchy matches the image layout.
        *   Ensure styles replicate the original image pixel-perfectly.

3.  **Output**:
    *   React + Tailwind component code.
    *   A JSON schema representing the layout tree.
    *   Include all extracted colors, fonts, and spacing tokens.

4.  **Extra Rules**:
    *   Always prioritize clean, reusable components.
    *   Ensure naming is descriptive (\`UserCard\`, \`ProfileCard\`, etc.).
    *   Use responsive units (\`rem\`, \`em\`, \`%\`, \`flex\`) not fixed pixels where possible.
    *   If uncertain about a detail (e.g., exact font), make a best guess and note it in comments.

EXAMPLE (cloning the uploaded card UI):
Input: Profile card image.
Output: 1. JSON layout tree describing image. 2. React + Tailwind code replicating the card.`,
  prompt: `The user has requested the component in the following framework: {{{framework}}}
The user's prompt is:
"{{{prompt}}}"
{{#if imageUrl}}
Analyze the following image and generate the corresponding HTML with Tailwind CSS code.
Image: {{media url=imageUrl}}
{{/if}}

Respond with the code, and nothing else.
`,
});

const generateUiComponentFlow = ai.defineFlow(
  {
    name: 'generateUiComponentFlow',
    inputSchema: GenerateUiComponentInputSchema,
    outputSchema: GenerateUiComponentOutputSchema,
  },
  async (input) => {
    // This is a temporary solution to the "contentType" issue.
    // A more robust solution would involve a tool to fetch the contentType.
    if (input.imageUrl && !input.imageUrl.startsWith('data:')) {
        // This is a basic way to guess the mime type. A more robust solution might be needed.
        const likelyMimeType = input.imageUrl.includes('PNG') ? 'image/png' : 'image/jpeg';
        input.imageUrl = `data:${likelyMimeType};base64,${input.imageUrl.substring(input.imageUrl.indexOf(',') + 1)}`;
    } else if (input.imageUrl && !input.imageUrl.startsWith('data:image')) {
        // If it starts with 'data:' but not 'data:image', it's likely missing the image part.
        input.imageUrl = `data:image/jpeg;base64,${input.imageUrl.substring(input.imageUrl.indexOf(',') + 1)}`;
    }
    const {output} = await prompt(input);
    return output!;
  }
);
