
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { handleGenerateComponent, handleEnhancePrompt, handleAnimatePrompt, handleImageUpload } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowUp,
  Image as ImageIcon,
  Clapperboard,
  X,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { ComponentPreview } from './component-preview';
import { useRouter, useSearchParams } from 'next/navigation';
import { CommunityGallery } from './community-gallery';
import type { AnimatePromptOutput } from '@/ai/flows/animate-prompt-flow';
import type { EnhancePromptOutput } from '@/ai/flows/enhance-prompt-flow';


export type Framework = 'html' | 'tailwindcss';

interface PromptViewProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: (prompt: string, framework: Framework, imageUrl?: string) => void;
  isLoading: boolean;
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

function PromptView({ prompt, setPrompt, onGenerate, isLoading, imageUrl, setImageUrl }: PromptViewProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isEnhancing, setIsEnhancing] = React.useState(false);
  const { toast } = useToast();
  
  const handleSuggestionClick = (action: () => void) => {
    if (isLoading || isEnhancing) return;
    action();
  };
  
  const enhancePromptAction = async (
    enhancer: (input: { user_prompt: string }) => Promise<AnimatePromptOutput | EnhancePromptOutput>, 
    successMessage: string
  ) => {
    if (!prompt.trim()) {
      toast({ title: 'Please enter a prompt first.', variant: 'destructive'});
      return;
    }
    setIsEnhancing(true);
    try {
      const result = await enhancer({ user_prompt: prompt });
      if (result && result.enhanced_prompt) {
        setPrompt(result.enhanced_prompt);
        toast({ title: successMessage, description: 'Your prompt has been upgraded.' });
      } else {
         throw new Error("The enhancement process failed to return a valid prompt.");
      }
    } catch(e: any) {
      console.error("Enhancement error:", e);
      toast({ title: 'Failed to enhance prompt', description: e.message || 'An unknown error occurred.', variant: 'destructive'});
    } finally {
      setIsEnhancing(false);
    }
  };
  
  const suggestionButtons = [
    { icon: ImageIcon, text: 'Upload Image', action: () => handleUploadClick() },
    { icon: Clapperboard, text: 'Animate Prompt', action: () => enhancePromptAction(handleAnimatePrompt, 'Prompt animated!')},
    { icon: Sparkles, text: 'Enhance Prompt', action: () => enhancePromptAction(handleEnhancePrompt, 'Prompt enhanced!')},
    { icon: LinkIcon, text: 'Clone URL', action: () => toast({ title: 'Coming Soon!', description: 'This feature is under development.'}) },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        setImageUrl(result);
        if(!prompt.trim()) {
            setPrompt("A component that looks like the image provided.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = () => {
    setImageUrl(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <main className="flex flex-col items-center justify-center p-4 md:p-6 my-12">
            <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-balance">
                Build UI at the speed of thought
                </h1>
                {imageUrl && (
                    <div className="relative w-full max-w-sm mx-auto">
                        <Image src={imageUrl} alt="Uploaded component" width={400} height={300} className="rounded-lg object-contain" />
                        <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7 rounded-full" onClick={handleRemoveImage}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                <div className="relative">
                    <Textarea
                        placeholder="A futuristic login form with glowing input fields and a sleek, dark theme..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-background border-border/50 rounded-xl p-4 pr-14 h-36 text-base focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <Button size="icon" onClick={() => onGenerate(prompt, 'html', imageUrl || undefined)} disabled={isLoading || isEnhancing} className="rounded-lg w-9 h-9 bg-primary text-primary-foreground hover:bg-primary/90">
                            <ArrowUp className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                {suggestionButtons.map((item, index) => (
                    <Button key={index} variant="outline" className="rounded-full h-auto text-sm" onClick={() => handleSuggestionClick(item.action)}>
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.text}</span>
                    </Button>
                ))}
                </div>
            </div>
            </main>
            <div className="px-4 md:px-8 pb-8">
                <CommunityGallery />
            </div>
        </div>
    </>
  );
}

export function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [framework, setFramework] = React.useState<Framework>('html');
  const [prompt, setPrompt] = React.useState('');
  const [generatedCode, setGeneratedCode] = React.useState('');
  const [previewHtml, setPreviewHtml] = React.useState('');
  const [layoutSuggestions, setLayoutSuggestions] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeView, setActiveView] = React.useState('prompt'); // 'prompt' or 'preview'
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const { toast } = useToast();
  
  React.useEffect(() => {
    const promptFromUrl = searchParams.get('prompt');
    if (promptFromUrl) {
      const decodedPrompt = decodeURIComponent(promptFromUrl);
      setPrompt(decodedPrompt);
      onGenerate(decodedPrompt, 'html');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onGenerate = async (currentPrompt: string, currentFramework: Framework, currentImageUrl?: string) => {
    if (!currentPrompt && !currentImageUrl) {
      toast({
        title: 'Prompt or image is required',
        description: 'Please enter a prompt or upload an image to generate a component.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedCode('');
    setPreviewHtml('');
    setLayoutSuggestions('');
    if (activeView !== 'preview') {
      setActiveView('preview');
    }
    
    try {
        let finalPrompt = currentPrompt;
        let result;

        if (currentImageUrl && !currentPrompt.includes("image provided")) {
             const promptResult = await handleImageUpload({ imageUrl: currentImageUrl });
             finalPrompt = promptResult.prompt;
             setPrompt(finalPrompt); // Update UI to show the new prompt
        }

        result = await handleGenerateComponent({ prompt: finalPrompt, framework: currentFramework, imageUrl: currentImageUrl });
        
        setGeneratedCode(result.code);
        setPreviewHtml(result.previewHtml || result.code);
        setLayoutSuggestions(result.suggestions);
        setFramework(currentFramework);
        setPrompt(finalPrompt);
        if (currentImageUrl) {
            setImageUrl(currentImageUrl);
        }

    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error generating component',
        description: error.message || 'There was an error generating the component. Please try again.',
        variant: 'destructive',
      });
      setGeneratedCode(''); // Clear code on error to show failure state
      setActiveView('prompt'); // Go back to prompt view on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFrameworkChange = (newFramework: Framework) => {
    setFramework(newFramework);
    if(prompt && generatedCode) {
      onGenerate(prompt, newFramework, imageUrl || undefined);
    }
  }

  const handleBackToPrompt = () => {
    setActiveView('prompt');
    setGeneratedCode('');
    setLayoutSuggestions('');
    setPrompt('');
    setImageUrl(null);
    router.replace('/app/dashboard');
  }

  if (activeView === 'prompt') {
    return (
        <PromptView 
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={onGenerate}
            isLoading={isLoading}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
        />
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
        <ComponentPreview
            code={generatedCode}
            previewHtml={previewHtml}
            suggestions={layoutSuggestions}
            isLoading={isLoading}
            framework={framework}
            prompt={prompt}
            onBack={handleBackToPrompt}
            onFrameworkChange={handleFrameworkChange}
        />
    </div>
  );
}
