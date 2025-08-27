
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
    <div className="flex min-h-screen w-full flex-col">
        <div className="hidden md:flex">
            <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>
        <div className={cn(
            "flex flex-col transition-[margin-left] duration-300 ease-in-out",
            isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
        )}>
            <Header onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
            {children}
        </div>
    </div>
  );
}
