
'use client';
import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageContent } from '@/components/app/page-content';

export default function DashboardPage() {
  // This is the new home for the main component generator UI for logged-in users.
  return (
    <div className="h-full w-full flex-1 flex flex-col">
        <React.Suspense fallback={<PageSkeleton />}>
            <PageContent />
        </React.Suspense>
    </div>
  );
}

function PageSkeleton() {
    return (
        <div className="flex-1 overflow-y-auto">
            <main className="flex flex-col items-center p-4 md:p-6 my-12">
                <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
                     <Skeleton className="h-12 w-full" />
                     <Skeleton className="h-36 w-full" />
                     <div className="flex items-center justify-center gap-2 flex-wrap">
                        <Skeleton className="h-9 w-24 rounded-full" />
                        <Skeleton className="h-9 w-32 rounded-full" />
                        <Skeleton className="h-9 w-36 rounded-full" />
                        <Skeleton className="h-9 w-36 rounded-full" />
                        <Skeleton className="h-9 w-28 rounded-full" />
                     </div>
                </div>
            </main>
        </div>
    )
}
