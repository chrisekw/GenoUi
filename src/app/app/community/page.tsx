
'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Copy, GitFork, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import type { GalleryItem } from '@/lib/gallery-items';
import { Skeleton } from '@/components/ui/skeleton';
import { ComponentRenderer } from '@/components/app/component-renderer';
import { useToast } from '@/hooks/use-toast';
import { handleLikeComponent, handleCopyComponent, getCommunityComponents } from '@/app/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function CommunityFeedPage() {
  const { toast } = useToast();
  const [components, setComponents] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

   useEffect(() => {
    async function fetchComps() {
        setLoading(true);
        try {
            const comps = await getCommunityComponents();
            setComponents(comps);
        } catch (error) {
            console.error("Error fetching community components:", error);
            toast({ title: "Error", description: "Could not load community components."})
        } finally {
            setLoading(false);
        }
    }
    fetchComps();
  }, [toast]);

  const onLikeClick = (componentId: string) => {
    // Optimistic UI update
    setComponents(prev => prev.map(c => 
        c.id === componentId 
        ? {...c, likes: (c.likes || 0) + 1} 
        : c
    ));

    startTransition(async () => {
        const result = await handleLikeComponent(componentId);
        if (!result.success) {
            toast({ title: 'Failed to update like', variant: 'destructive' });
            // Revert optimistic update on failure
            setComponents(prev => prev.map(c => 
                c.id === componentId 
                ? {...c, likes: (c.likes || 0) - 1} 
                : c
            ));
        }
    });
  }

  const onCopyClick = (code: string, componentId: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: 'Code copied to clipboard!' });
    
    startTransition(() => {
        setComponents(prev => prev.map(c => 
            c.id === componentId 
            ? {...c, copies: (c.copies || 0) + 1} 
            : c
        ));
        handleCopyComponent(componentId);
    });
  }

  const renderSkeleton = () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
             <Card key={i} className="bg-transparent border-none shadow-none">
                <CardContent className="p-0 aspect-[4/3] bg-muted/40 rounded-lg">
                    <Skeleton className="w-full h-full" />
                </CardContent>
                <CardFooter className="p-0 pt-4">
                    <div className="w-full">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </CardFooter>
            </Card>
        ))}
    </div>
    );


  return (
    <Card>
        <CardHeader>
            <CardTitle>Community Gallery</CardTitle>
        </CardHeader>
        <CardContent>
            {loading ? renderSkeleton() : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {components.length === 0 ? (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No components published yet. Be the first!</p>
                </div>
            ) : (
                components.map((item, index) => (
                <Card 
                key={item.id}
                className="group relative flex flex-col overflow-hidden transition-all duration-300 animate-fade-in-up bg-secondary border-none shadow-none rounded-lg hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms`}}
                >
                    <CardContent className="p-0 aspect-[4/3] flex-grow bg-muted/20 rounded-t-lg overflow-hidden border-b">
                    <Link href={`/component/${item.id}`} className="block w-full h-full bg-background overflow-hidden">
                        <ComponentRenderer html={item.previewHtml} />
                    </Link>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 bg-card">
                        <div className='flex-grow overflow-hidden'>
                        <p className="font-semibold truncate text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3"/>
                            <span>{item.likes || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                            <GitFork className="h-3 w-3"/>
                            <span>{item.copies || 0}</span>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onLikeClick(item.id)} disabled={isPending}>
                                <Heart className="mr-2 h-4 w-4" />
                                <span>Like</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onCopyClick(item.code, item.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy Code</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardFooter>
                </Card>
                ))
            )}
            </div>
        )}
        </CardContent>
    </Card>
  );
}
