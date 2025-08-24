
'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, GitFork, MoreVertical, Copy } from 'lucide-react';
import type { GalleryItem } from '@/lib/gallery-items';
import { getCommunityComponents, handleCopyComponent, handleLikeComponent } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { ComponentRenderer } from '@/components/app/component-renderer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function CommunityGallery() {
  const { toast } = useToast();
  const [components, setComponents] = React.useState<GalleryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    async function fetchComponents() {
      try {
        const comps = await getCommunityComponents(4);
        setComponents(comps);
      } catch (error) {
        console.error("Error fetching community components:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchComponents();
  }, []);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">From the Community</h2>
          <p className="text-muted-foreground">Explore what the community is building.</p>
        </div>
        <Link href="/community" className="flex items-center text-sm font-medium text-primary hover:underline">
          Browse All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      {loading ? renderSkeleton() : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((item) => (
             <Card 
                key={item.id}
                className="group relative flex flex-col overflow-hidden transition-all duration-300 bg-secondary border-none shadow-none rounded-lg hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
                >
                <CardContent className="p-0 aspect-[4/3] flex-grow bg-muted/20 rounded-t-lg overflow-hidden border-b">
                    <Link href={`/component/${item.id}`} className="block w-full h-full bg-background overflow-hidden">
                        <ComponentRenderer html={item.previewHtml} />
                    </Link>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4">
                    <div className='flex-grow overflow-hidden'>
                        <Link href={`/component/${item.id}`}><p className="font-semibold truncate text-sm hover:underline">{item.name}</p></Link>
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
          ))}
        </div>
      )}
    </div>
  );
}
