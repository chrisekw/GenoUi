
'use server';

/**
 * @fileOverview An AI flow to generate a descriptive prompt from an image.
 *
 * - generatePromptFromImage - A function that takes an image and returns a text prompt.
 * - GeneratePromptFromImageInput - The input type for the function.
 * - GeneratePromptFromImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptFromImageInputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "An image of a UI component to replicate, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GeneratePromptFromImageInput = z.infer<
  typeof GeneratePromptFromImageInputSchema
>;

const GeneratePromptFromImageOutputSchema = z.object({
  prompt: z
    .string()
    .describe('A detailed text prompt describing the UI in the image.'),
});
export type GeneratePromptFromImageOutput = z.infer<
  typeof GeneratePromptFromImageOutputSchema
>;

export async function generatePromptFromImage(
  input: GeneratePromptFromImageInput
): Promise<GeneratePromptFromImageOutput> {
  return generatePromptFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromptFromImagePrompt',
  input: {schema: GeneratePromptFromImageInputSchema},
  output: {schema: GeneratePromptFromImageOutputSchema},
  prompt: `You are an expert UI/UX analyst. Your task is to analyze the provided image of a UI component and generate a detailed, descriptive text prompt that could be used by another AI to recreate that component.

Analyze the image provided and describe it in detail. Focus on layout, color schemes, typography, key elements (buttons, inputs, cards), and the overall style (e.g., modern, minimalist, futuristic, corporate).

Image: {{media url=imageUrl}}

Generate a single, cohesive paragraph for the prompt.
`,
});

const generatePromptFromImageFlow = ai.defineFlow(
  {
    name: 'generatePromptFromImageFlow',
    inputSchema: GeneratePromptFromImageInputSchema,
    outputSchema: GeneratePromptFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate prompt from image.');
    }
    return output;
  }
);
