
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from './sidebar';
import { Logo } from '../icons/logo';

interface HeaderProps {
  onToggleSidebar: () => void;
}


export function Header({ onToggleSidebar }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs p-0 w-64">
                   <Sidebar isMobile />
                </SheetContent>
            </Sheet>
            <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={onToggleSidebar}
            >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
            
            <div className="w-full flex-1">
                {/* Can add search or other header elements here */}
            </div>
            
        </header>
    );
}
