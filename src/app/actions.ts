
'use server';
import { generateUiComponent, GenerateUiComponentInput } from '@/ai/flows/generate-ui-component';
import { optimizeComponentLayout } from '@/ai/flows/optimize-component-layout';
import { cloneUrl, CloneUrlInput } from '@/ai/flows/clone-url-flow';
import { enhancePrompt, EnhancePromptOutput } from '@/ai/flows/enhance-prompt-flow';
import { animatePrompt, AnimatePromptOutput } from '@/ai/flows/animate-prompt-flow';
import { replaceImagePlaceholders } from '@/ai/flows/replace-image-placeholders-flow';
import type { GalleryItem } from '@/lib/gallery-items';

// NOTE: Login and Signup actions are now handled on the client-side
// to ensure proper session persistence with Firebase Auth.
// The functions are removed from here to avoid confusion.

export async function handleGenerateComponent(
  input: GenerateUiComponentInput,
) {
  try {
    const [componentResult, layoutResult] = await Promise.all([
        generateUiComponent(input),
        optimizeComponentLayout({ componentPrompt: input.prompt, framework: input.framework as 'html' }).catch(err => {
            console.error('Error in layout optimization flow:', err);
            return { layoutSuggestions: "Could not generate suggestions." };
        })
    ]);
    
    // After generating the component, replace image placeholders
    const { html: finalizedHtml } = await replaceImagePlaceholders({ html: componentResult.code });

    return { 
        code: componentResult.code, 
        suggestions: layoutResult.layoutSuggestions,
        previewHtml: finalizedHtml
    };

  } catch (error: any) {
    console.error('[CRITICAL] Error in handleGenerateComponent:', error);
    throw new Error(`Failed to generate component due to a server error: ${error.message}`);
  }
}

export async function handleEnhancePrompt(prompt: string): Promise<EnhancePromptOutput> {
    try {
        const result = await enhancePrompt({ prompt });
        return result;
    } catch (error: any) {
        console.error('Error in enhance prompt flow:', error);
        throw new Error('Failed to enhance prompt.');
    }
}

export async function handleAnimatePrompt(prompt: string): Promise<AnimatePromptOutput> {
    try {
        const result = await animatePrompt({ prompt });
        return result;
    } catch (error: any) {
        console.error('Error in animate prompt flow:', error);
        throw new Error('Failed to animate prompt.');
    }
}


export async function handleCloneUrl(
    input: CloneUrlInput,
) {
    if (!process.env.BROWSERLESS_API_KEY) {
        return { code: 'Error: This feature is coming soon! The server is not yet configured with the required API keys.' };
    }
    try {
        const result = await cloneUrl(input);
        return result;
    } catch (error: any)
{
        console.error('Error in clone URL flow:', error);
         if (error.message.includes('quota')) {
            throw new Error("You have exceeded the daily request limit. Please try again tomorrow or upgrade for higher limits.");
        }
        throw new Error('Failed to clone URL.');
    }
}

// These actions are now stubs as there is no database connected.
// They return empty or success states to prevent the UI from crashing.

export async function getCommunityComponents(limit_?: number): Promise<GalleryItem[]> {
    return [];
}

export async function getComponentById(id: string): Promise<GalleryItem | null> {
    return null;
}

export async function handleLikeComponent(componentId: string): Promise<{ success: boolean, likes?: number }> {
    return { success: true };
}

export async function handleCopyComponent(componentId: string) {
    return;
}

export async function handlePublishComponent(componentData: {
    name: string;
    description: string;
    prompt: string;
    code: string;
    framework: string;
    category: string;
    previewHtml: string;
}): Promise<{success: boolean, message?: string}> {
    return { success: true };
}
