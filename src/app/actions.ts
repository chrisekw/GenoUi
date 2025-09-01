
'use server';
import { generateUiComponent, GenerateUiComponentInput } from '@/ai/flows/generate-ui-component';
import { optimizeComponentLayout } from '@/ai/flows/optimize-component-layout';
import { cloneUrl, CloneUrlInput } from '@/ai/flows/clone-url-flow';
import { enhancePrompt, EnhancePromptOutput, EnhancePromptInput } from '@/ai/flows/enhance-prompt-flow';
import { animatePrompt, AnimatePromptOutput, AnimatePromptInput } from '@/ai/flows/animate-prompt-flow';
import { replaceImagePlaceholders } from '@/ai/flows/replace-image-placeholders-flow';
import { generatePromptFromImage } from '@/ai/flows/generate-prompt-from-image-flow';
import { galleryItems, type GalleryItem } from '@/lib/gallery-items';

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
    let finalizedHtml = componentResult.code;
    try {
        const imageResult = await replaceImagePlaceholders({ html: componentResult.code });
        finalizedHtml = imageResult.html;
    } catch (e) {
        console.error("Image placeholder replacement failed, falling back to original code.", e);
    }


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

export async function handleImageUpload(input: { imageUrl: string }): Promise<{ prompt: string }> {
    try {
        const result = await generatePromptFromImage(input);
        return result;
    } catch (error: any) {
        console.error('Error in image upload flow:', error);
        throw new Error('Failed to generate prompt from image.');
    }
}


export async function handleEnhancePrompt(input: EnhancePromptInput): Promise<EnhancePromptOutput> {
    try {
        const result = await enhancePrompt(input);
        return result;
    } catch (error: any) {
        console.error('Error in enhance prompt flow:', error);
        throw new Error('Failed to enhance prompt.');
    }
}

export async function handleAnimatePrompt(input: AnimatePromptInput): Promise<AnimatePromptOutput> {
    try {
        const result = await animatePrompt(input);
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

// These actions simulate a database using an in-memory array.
// In a real application, you would replace this with calls to Firestore or another database.

export async function getCommunityComponents(limit?: number): Promise<GalleryItem[]> {
    // Simulate fetching from a database, returning in reverse chronological order
    const sorted = [...galleryItems].sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    return limit ? sorted.slice(0, limit) : sorted;
}

export async function getComponentById(id: string): Promise<GalleryItem | null> {
    // Simulate fetching a single component by its ID
    const component = galleryItems.find(c => c.id === id) || null;
    return component;
}

export async function handleLikeComponent(componentId: string): Promise<{ success: boolean, likes?: number }> {
    // Simulate liking a component
    const component = galleryItems.find(c => c.id === componentId);
    if (component) {
        component.likes = (component.likes || 0) + 1;
        return { success: true, likes: component.likes };
    }
    return { success: false };
}

export async function handleCopyComponent(componentId: string) {
    // Simulate incrementing a copy counter
    const component = galleryItems.find(c => c.id === componentId);
    if (component) {
        component.copies = (component.copies || 0) + 1;
    }
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
    // Simulate publishing a component
    const newComponent: GalleryItem = {
        id: `comp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        ...componentData,
        likes: 0,
        copies: 0,
        createdAt: new Date(),
        framework: 'html', // Assuming HTML for now
    };
    galleryItems.push(newComponent);
    return { success: true };
}
