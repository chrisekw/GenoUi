
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getComponentById } from '@/app/actions';
import type { GalleryItem } from '@/lib/gallery-items';
import { Skeleton } from '@/components/ui/skeleton';
import { ComponentPreview } from '@/components/app/component-preview';

export default function ComponentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [component, setComponent] = React.useState<GalleryItem | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (id) {
            async function fetchComponent() {
                try {
                    const comp = await getComponentById(id);
                    if (comp) {
                        setComponent(comp);
                    } else {
                        setError('Component not found.');
                    }
                } catch (e) {
                    setError('Failed to fetch component.');
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }
            fetchComponent();
        }
    }, [id]);

    const renderSkeleton = () => (
        <div className="p-8 h-screen">
            <Skeleton className="h-12 w-1/2 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <div className="border rounded-lg h-[70vh]">
                <div className="h-12 bg-muted border-b" />
                <Skeleton className="h-full w-full" />
            </div>
        </div>
    );
    
    if (loading) {
        return (
            <main>
                {renderSkeleton()}
            </main>
        )
    }

    if (error || !component) {
       return (
            <main className="flex-1 flex items-center justify-center h-screen">
                <p>{error || 'Component could not be loaded.'}</p>
            </main>
        )
    }

    return (
        <main className="h-full">
            <ComponentPreview
                code={component.code}
                previewHtml={component.previewHtml}
                suggestions={`This component was created from the prompt: "${component.prompt}"`}
                isLoading={false}
                framework={component.framework}
                prompt={component.prompt}
                onBack={() => router.back()}
                onFrameworkChange={() => { /* Framework change can be handled here if needed */}}
                isPublished
            />
        </main>
    );
}
