
'use client';

import Link from 'next/link';
import { Home, Users, Settings, Heart, CreditCard, Shield, LogOut, Save, Gift, LayoutGrid, User, LogIn } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from '../icons/logo';
import * as React from 'react';
import { SheetClose } from '../ui/sheet';
import { Button } from '../ui/button';
import { useAuth } from '@/app/auth-provider';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const navItems = [
    { href: '/app/dashboard', icon: LayoutGrid, label: 'Home', auth: true },
    { href: '/app/community', icon: Gift, label: 'Community', auth: false },
    { href: '/app/pricing', icon: CreditCard, label: 'Pricing', auth: false },
];

const NavLink = ({ item, isMobile, isCollapsed }: { item: typeof navItems[0], isMobile: boolean, isCollapsed: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    const linkContent = (
        <span 
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary",
                isCollapsed && "justify-center"
            )}
        >
            <item.icon className="h-5 w-5" />
            <span className={cn("transition-opacity", isCollapsed && !isMobile ? "hidden" : "inline-block")}>{item.label}</span>
        </span>
    );

    const linkWrapper = (
        <Link href={item.href}>
            {linkContent}
        </Link>
    );

    if (isMobile) {
        return <SheetClose asChild>{linkWrapper}</SheetClose>;
    }
    
    if (isCollapsed) {
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {linkWrapper}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {item.label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return linkWrapper;
};


const UserProfileLink = ({ isMobile, children }: { isMobile: boolean, children: React.ReactNode }) => {
    const Wrapper = isMobile ? SheetClose : React.Fragment;
    const wrapperProps = isMobile ? { asChild: true } : {};
    
    // @ts-ignore - a small concession for a clean implementation
    return <Wrapper {...wrapperProps}>{children}</Wrapper>
}


const SidebarContent = ({ isMobile = false, isCollapsed = false }) => {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast({ title: 'Signed out successfully.' });
            router.push('/login');
        } catch (error) {
            toast({ title: 'Failed to sign out.', variant: 'destructive' });
        }
    };

    return (
     <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/app/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6" />
                <span className={cn(isCollapsed && !isMobile ? "hidden" : "inline")}>GenoUI</span>
            </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navItems.filter(item => !item.auth || user).map(item => <NavLink key={item.href} item={item} isMobile={isMobile} isCollapsed={isCollapsed} />)}
            </nav>
        </div>
        <div className={cn("mt-auto p-4", isCollapsed && !isMobile && "px-2")}>
            {user ? (
                <div className="grid gap-2">
                    <UserProfileLink isMobile={isMobile}>
                        <Link href="/app/profile">
                            <Button variant="ghost" className="w-full justify-start">
                                <User className="h-4 w-4" />
                                <span className={cn("ml-2", isCollapsed && !isMobile ? "hidden" : "inline")}>Profile</span>
                            </Button>
                        </Link>
                     </UserProfileLink>
                     <Button variant="secondary" onClick={handleSignOut} className="w-full justify-center">
                        <LogOut className="h-4 w-4" />
                         <span className={cn("ml-2", isCollapsed && !isMobile ? "hidden" : "inline")}>Sign Out</span>
                    </Button>
                 </div>
            ) : (
                <div className="grid gap-2">
                    <UserProfileLink isMobile={isMobile}>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">
                               <LogIn className="mr-2 h-4 w-4"/>
                                <span className={cn(isCollapsed && !isMobile ? "hidden" : "inline")}>Login</span>
                            </Button>
                        </Link>
                    </UserProfileLink>
                     <UserProfileLink isMobile={isMobile}>
                        <Link href="/signup">
                            <Button className="w-full">
                               <span className={cn(isCollapsed && !isMobile ? "hidden" : "inline")}>Sign Up</span>
                            </Button>
                        </Link>
                    </UserProfileLink>
                </div>
            )}
        </div>
    </div>
    )
};


export function Sidebar({ isMobile = false, isCollapsed = false }: { isMobile?: boolean, isCollapsed?: boolean }) {
  if (isMobile) {
    return <SidebarContent isMobile={true} />;
  }

  return (
    <aside className={cn(
        "fixed inset-y-0 left-0 z-10 hidden flex-col border-r bg-background md:flex transition-[width] duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
    )}>
        <SidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
}
