
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

export function Header({ isUser }: { isUser: boolean}) {

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <div className="flex items-center gap-2 md:hidden">
                 <Link href="/app/dashboard" className="flex items-center gap-2 font-semibold">
                    <Logo className="h-6 w-6" />
                    <span className="">GenoUI</span>
                </Link>
            </div>
            
            <div className="w-full flex-1">
                {/* Can add search or other header elements here */}
            </div>
            
            <div className="flex items-center gap-2">
                 <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs p-0 w-64">
                           <Sidebar isMobile />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
