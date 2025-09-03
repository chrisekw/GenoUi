
'use server';
import { generateUiComponent, GenerateUiComponentInput } from '@/ai/flows/generate-ui-component';
import { optimizeComponentLayout } from '@/ai/flows/optimize-component-layout';
import { cloneUrl, CloneUrlInput } from '@/ai/flows/clone-url-flow';
import { enhancePrompt, EnhancePromptOutput, EnhancePromptInput } from '@/ai/flows/enhance-prompt-flow';
import { animatePrompt, AnimatePromptOutput, AnimatePromptInput } from '@/ai/flows/animate-prompt-flow';
import { replaceImagePlaceholders } from '@/ai/flows/replace-image-placeholders-flow';
import { generatePromptFromImage } from '@/ai/flows/generate-prompt-from-image-flow';
import { type GalleryItem } from '@/lib/gallery-items';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit as firestoreLimit, getDocs, doc, getDoc, updateDoc, increment } from 'firebase/firestore';


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

export async function getCommunityComponents(limit?: number): Promise<GalleryItem[]> {
    try {
        const componentsRef = collection(db, 'components');
        let q;
        if (limit) {
            q = query(componentsRef, orderBy('createdAt', 'desc'), firestoreLimit(limit));
        } else {
            q = query(componentsRef, orderBy('createdAt', 'desc'));
        }

        const querySnapshot = await getDocs(q);
        const components: GalleryItem[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            components.push({
                id: doc.id,
                ...data,
                // Convert Firestore Timestamp to JS Date
                createdAt: data.createdAt?.toDate(),
            } as GalleryItem);
        });
        return components;
    } catch (error) {
        console.error("Error fetching community components from Firestore:", error);
        return []; // Return empty array on error
    }
}

export async function getComponentById(id: string): Promise<GalleryItem | null> {
    try {
        const docRef = doc(db, 'components', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt?.toDate(),
            } as GalleryItem;
        } else {
            console.warn(`Component with id ${id} not found.`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching component by ID from Firestore:", error);
        return null;
    }
}

export async function handleLikeComponent(componentId: string): Promise<{ success: boolean, likes?: number }> {
    try {
        const docRef = doc(db, 'components', componentId);
        await updateDoc(docRef, {
            likes: increment(1)
        });
        // To return the new like count, we would need another read.
        // For optimistic UI, we can just return success.
        return { success: true };
    } catch (error) {
        console.error("Error liking component in Firestore:", error);
        return { success: false };
    }
}

export async function handleCopyComponent(componentId: string) {
     try {
        const docRef = doc(db, 'components', componentId);
        await updateDoc(docRef, {
            copies: increment(1)
        });
        return { success: true };
    } catch (error) {
        console.error("Error incrementing copy count in Firestore:", error);
        return { success: false };
    }
}

export async function handlePublishComponent(componentData: {
    name: string;
    description: string;
    prompt: string;
    code: string;
    framework: string;
    category: string;
    previewHtml: string;
    authorId: string;
    authorName: string;
}): Promise<{success: boolean, message?: string}> {
    try {
        await addDoc(collection(db, 'components'), {
            ...componentData,
            likes: 0,
            copies: 0,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error publishing component to Firestore:", error);
        return { success: false, message: error.message };
    }
}
