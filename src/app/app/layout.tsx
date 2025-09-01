
'use client';
import { Header } from '@/components/app/header';
import * as React from 'react';

// This is now the layout for all authenticated pages
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col overflow-auto">
        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
