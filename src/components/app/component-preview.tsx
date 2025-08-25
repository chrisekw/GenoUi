
'use client';

import * as React from 'react';
import { CodeDisplay } from './code-display';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Lightbulb, Code as CodeIcon, Eye, ArrowLeft, Share2, Smartphone, Tablet, Laptop } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Wand2 } from 'lucide-react';
import type { Framework } from './page-content';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ComponentRenderer } from './component-renderer';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { componentCategories } from '@/lib/component-categories';
import { handlePublishComponent } from '@/app/actions';


interface ComponentPreviewProps {
  code: string;
  previewHtml?: string;
  suggestions: string;
  isLoading: boolean;
  framework: Framework;
  prompt: string;
  onBack: () => void;
  onFrameworkChange: (framework: Framework) => void;
  isPublished?: boolean; // New prop
}

const viewportSizes = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

export function ComponentPreview({
  code,
  previewHtml,
  suggestions,
  isLoading,
  framework,
  prompt,
  onBack,
  onFrameworkChange,
  isPublished = false, // Default to false
}: ComponentPreviewProps) {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [showPublishDialog, setShowPublishDialog] = React.useState(false);
  const [componentName, setComponentName] = React.useState('');
  const [componentDescription, setComponentDescription] = React.useState('');
  const [componentCategory, setComponentCategory] = React.useState('');
  const [viewport, setViewport] = React.useState<keyof typeof viewportSizes>('desktop');
  const previewRef = React.useRef<HTMLDivElement>(null);


  const getBasePreviewHtml = (componentCode: string): string => {
    // This is the HTML structure that gets passed to the finalizing flow.
    const baseStyles = `
      body {
        font-family: Inter, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        min-height: 100vh;
        padding: 1rem;
        box-sizing: border-box;
      }
    `;
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${baseStyles}</style>
        </head>
        <body class="bg-background text-foreground">
          ${componentCode}
        </body>
      </html>
    `;
  };

  const handlePublish = async () => {
    if (!componentName.trim() || !componentCategory.trim()) {
        toast({ title: 'Name and category are required', variant: 'destructive'});
        return;
    }

    setIsPublishing(true);
    try {
        const fullPreviewHtml = getBasePreviewHtml(code);
        const result = await handlePublishComponent({
            name: componentName,
            description: componentDescription,
            prompt: prompt,
            code: code,
            framework,
            category: componentCategory,
            previewHtml: fullPreviewHtml,
        });

        if (result.success) {
            toast({
                title: 'Component published!',
                description: 'Your component is now available in the community.',
            });
            setShowPublishDialog(false);
        } else {
             toast({
                title: 'Failed to publish component',
                description: result.message || 'An unknown error occurred.',
                variant: 'destructive'
            })
        }
    } catch(e: any) {
        toast({
            title: 'Failed to publish component',
            description: e.message || 'An unknown error occurred.',
            variant: 'destructive'
        })
    } finally {
        setIsPublishing(false);
    }
  }
  
  const onPublishClick = () => {
    setShowPublishDialog(true);
  }

  const renderContent = () => {
    if (isLoading && !code) {
      return (
         <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
                <Wand2 className="h-12 w-12 animate-pulse text-primary" />
                <p className="text-muted-foreground">Generating component...</p>
            </div>
         </div>
      );
    }
  
    if (!code && !isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-muted-foreground p-6">
             <Wand2 className="mx-auto h-12 w-12" />
            <p className="mt-4">
              Something went wrong. Please try again.
            </p>
             <Button onClick={onBack} variant="outline" className="mt-4">Go Back</Button>
          </div>
        </div>
      );
    }

    return (
        <>
            <Tabs defaultValue="preview" className="w-full h-full flex flex-col">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 pt-4 border-b">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft />
                    </Button>
                    <TabsList>
                        <TabsTrigger value="preview"><Eye className="h-4 w-4 md:mr-2" /><span className="hidden md:inline">Preview</span></TabsTrigger>
                        <TabsTrigger value="code"><CodeIcon className="h-4 w-4 md:mr-2" /><span className="hidden md:inline">Code</span></TabsTrigger>
                        <TabsTrigger value="suggestions"><Lightbulb className="h-4 w-4 md:mr-2" /><span className="hidden md:inline">Suggestions</span></TabsTrigger>
                    </TabsList>
                </div>
                 <div className="flex items-center gap-2 w-full sm:w-auto">
                     <Tabs value={framework} onValueChange={(value) => onFrameworkChange(value as Framework)}>
                    <TabsList className="w-full">
                        <TabsTrigger value="html" className="flex-1">HTML</TabsTrigger>
                        <TabsTrigger value="tailwindcss" className="flex-1">Tailwind</TabsTrigger>
                    </TabsList>
                    </Tabs>
                    {!isPublished && (
                         <Button variant="outline" onClick={onPublishClick} disabled={isPublishing}>
                            <Share2 className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">Publish</span>
                        </Button>
                    )}
                </div>
                </div>
                <TabsContent value="preview" className="flex-1 bg-muted/20 relative p-4 md:p-8">
                    {isLoading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-4">
                                <Wand2 className="h-12 w-12 animate-pulse text-primary" />
                                <p className="text-muted-foreground">Regenerating component...</p>
                            </div>
                        </div>
                    )}
                     <ToggleGroup
                        type="single"
                        value={viewport}
                        onValueChange={(value: keyof typeof viewportSizes) => {
                            if (value) setViewport(value);
                        }}
                        aria-label="Viewport size"
                        className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-background rounded-lg p-1 shadow-md"
                    >
                        <ToggleGroupItem value="mobile" aria-label="Mobile viewport">
                            <Smartphone className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="tablet" aria-label="Tablet viewport">
                            <Tablet className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="desktop" aria-label="Desktop viewport">
                            <Laptop className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <div 
                        ref={previewRef}
                        className={cn(
                            "relative transition-all duration-300 ease-in-out w-full h-full mx-auto",
                            "bg-background shadow-lg rounded-lg border flex items-center justify-center overflow-hidden"
                        )}
                        style={{ maxWidth: viewportSizes[viewport] }}
                    >
                       <ComponentRenderer html={previewHtml} code={code} framework={framework} />
                    </div>
                </TabsContent>
                <TabsContent value="code" className="flex-1 overflow-y-auto p-4 h-full">
                    <CodeDisplay code={code} framework={framework} />
                </TabsContent>
                <TabsContent value="suggestions" className="p-4">
                    <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Layout Suggestions</AlertTitle>
                    <AlertDescription className="whitespace-pre-wrap">
                        {suggestions || "No suggestions available."}
                    </AlertDescription>
                    </Alert>
                </TabsContent>
            </Tabs>
            <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Publish to Community</DialogTitle>
                    <DialogDescription>
                        Share your component with the community. Provide a name and description.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={componentName} onChange={(e) => setComponentName(e.target.value)} className="col-span-3" placeholder="e.g., 'Modern Login Form'"/>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input id="description" value={componentDescription} onChange={(e) => setComponentDescription(e.target.value)} className="col-span-3" placeholder="A brief description of your component."/>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Select onValueChange={setComponentCategory}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {componentCategories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setShowPublishDialog(false)}>Cancel</Button>
                    <Button onClick={handlePublish} disabled={isPublishing}>
                        {isPublishing ? 'Publishing...' : 'Publish'}
                    </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {renderContent()}
    </div>
  )
}
