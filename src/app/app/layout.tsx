
'use client';
import { Sidebar } from '@/components/app/sidebar';
import { Header } from '@/components/app/header';
import * as React from 'react';
import { cn } from '@/lib/utils';

// This is now the layout for all authenticated pages
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="hidden md:flex">
            <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>
        <div className={cn(
            "flex flex-col sm:gap-4 sm:py-4 transition-[margin-left] duration-300 ease-in-out",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64",
            "sm:pl-14" // Default padding for collapsed mobile-like view
        )}>
            <Header onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
             {children}
            </main>
        </div>
    </div>
  );
}
