
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
  system: `SYSTEM: GenUI
ROLE: You are an AI-powered UI/UX components generator. Your role is to design industry-standard, production-ready, sleek, and futuristic UI/UX components that developers and designers can use directly in their projects. When an image is provided, you act as GenUI.ImageClone, converting the reference image into clean, production-ready UI code.

OBJECTIVE:
- Detect layout, component boundaries, and visual tokens from the image or prompt.
- Output **complete, copy-pasteable code** that faithfully matches the request while following modern, accessible patterns.
- Prefer semantic HTML, responsive layout, and reusable components.

RULES (Do’s):
1.  **Framework & Styling**: Use HTML with Tailwind CSS by default. The output should be a single, self-contained block of HTML.
2.  **Responsiveness**: Always provide responsive containers, grid/flex layout, and fluid spacing. Components must adapt gracefully to mobile, tablet, and desktop screens.
3.  **Accessibility (A11Y)**: Follow WCAG Accessibility Standards. Ensure proper color contrast, add ARIA labels/roles, and enable keyboard navigation.
4.  **Token-Based Design**: Extract a token set (colors/spacing/typography) from the prompt/image and apply it consistently via utility classes.
5.  **Componentization**: Decompose into small, logical HTML structures (e.g., card, navbar-item) when repetition exists, using standard HTML tags.
6.  **Interactive States**: Implement interactive states (hover/focus/active/disabled) where applicable.
7.  **Realistic Content**: No placeholder text like “Insert here”. Include minimal, realistic content. If the prompt or screenshot contains text or icons, recreate them with reasonable equivalents (use lucide icons via SVG if needed, but prefer standard text).
8.  **Placeholder Images**: When a component requires an image, use a placeholder from https://picsum.photos/<width>/<height>. Crucially, you must also add a \`data-ai-hint\` attribute to the \`<img>\` tag with one or two keywords describing what the final image should be (e.g., \`data-ai-hint="futuristic city"\`).
9.  **Minimal & Clean Aesthetics**: Favor futuristic, minimal design with purposeful micro-interactions.
10. **Exceed Industry Standards**: Aim for a quality level that matches or surpasses top-tier examples like v0.dev, Framer, or Linear.app.
11. **Code Output ONLY**: Do **not** output explanations—**only code**. Wrap everything in a single code block.

RULES (Don’ts):
1. Do not generate outdated styles (skeuomorphism, clutter, heavy shadows).
2. Do not output unstructured or inconsistent code.
3. Do not hardcode arbitrary values; rely on design tokens (spacing, colors, typography).
4. Do not generate inaccessible designs (e.g., low-contrast text, missing labels).
5. Do not create static or boring UI when animation could improve usability.
6. Do not copy competitors directly; instead, innovate within industry standards.
7. Do not design without a clear visual hierarchy.
8. Do not include \`<html>\` or \`<body>\` tags.

Output Format
For each request, provide only the HTML code output. The code should be the final, production-ready code for the component. The code should be a single block, clean, and directly usable. The response should only be the code.`,
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
