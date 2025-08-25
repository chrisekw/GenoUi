
'use client';
import { Sidebar } from '@/components/app/sidebar';
import { Header } from '@/components/app/header';
import * as React from 'react';

// This is now the layout for all authenticated pages
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // isUser state is now managed by FirebaseAuthProvider
  return (
    <div className="flex min-h-screen w-full flex-col">
        <div className="hidden md:flex">
            <Sidebar />
        </div>
        <div className="flex flex-col md:pl-64">
            <Header isUser={false} />
            {children}
        </div>
    </div>
  );
}
