
'use client';

import Link from 'next/link';
import { Home, Users, Settings, Heart, CreditCard, Shield, LogOut, Save, Gift, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '../icons/logo';
import * as React from 'react';
import { SheetClose } from '../ui/sheet';


const navItems = [
    { href: '/app', icon: LayoutGrid, label: 'Home' },
    { href: '/community', icon: Gift, label: 'Community' },
    { href: '/pricing', icon: CreditCard, label: 'Pricing' },
];

const NavLink = ({ item, isMobile }: { item: typeof navItems[0], isMobile: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    const linkComponent = (
        <Link 
            href={item.href} 
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary"
            )}
        >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
        </Link>
    );

    if (isMobile) {
        return <SheetClose asChild>{linkComponent}</SheetClose>;
    }
    return linkComponent;
};


const SidebarContent = ({ isMobile = false }) => (
     <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/app" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6" />
                <span className="">GenoUI</span>
            </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navItems.map(item => <NavLink key={item.href} item={item} isMobile={isMobile} />)}
            </nav>
        </div>
    </div>
);


export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return <SidebarContent isMobile={true} />;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background md:flex">
        <SidebarContent />
    </aside>
  );
}
