
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
  const [isUser, setIsUser] = React.useState(false);

  React.useEffect(() => {
    // In a real app, you'd check for a session token here.
    // For now, we'll simulate a logged-in user.
    setIsUser(true);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
        <div className="hidden md:flex">
            <Sidebar isUser={isUser} />
        </div>
        <div className="flex flex-col md:pl-64">
            <Header isUser={isUser} />
            {children}
        </div>
    </div>
  );
}
