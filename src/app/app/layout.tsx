
'use client';
import { Sidebar } from '@/components/app/sidebar';
import { Header } from '@/components/app/header';
import * as React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
        <div className="hidden md:flex">
            <Sidebar />
        </div>
        <div className="flex flex-col md:pl-64">
            <Header />
            {children}
        </div>
    </div>
  );
}
