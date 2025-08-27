
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from './sidebar';
import { Logo } from '../icons/logo';

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
            <Link href="/app/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6" />
                <span className="">GenoUI</span>
            </Link>
            
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-64">
                   <Sidebar isMobile />
                </SheetContent>
            </Sheet>
        </header>
    );
}
