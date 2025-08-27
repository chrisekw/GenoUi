
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
    { href: '/app/community', icon: Gift, label: 'Community', auth: true },
    { href: '/app/pricing', icon: CreditCard, label: 'Pricing', auth: true },
];

const NavLink = ({ item, isMobile }: { item: typeof navItems[0], isMobile: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    const linkContent = (
        <span 
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary"
            )}
        >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
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

    return linkWrapper;
};


const UserProfileLink = ({ isMobile, children }: { isMobile: boolean, children: React.ReactNode }) => {
    const Wrapper = isMobile ? SheetClose : React.Fragment;
    const wrapperProps = isMobile ? { asChild: true } : {};
    
    // @ts-ignore - a small concession for a clean implementation
    return <Wrapper {...wrapperProps}>{children}</Wrapper>
}


const SidebarContent = ({ isMobile = false }) => {
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
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
            <Link href="/app/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-6 w-6" />
                <span>GenoUI</span>
            </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navItems.filter(item => !item.auth || user).map(item => <NavLink key={item.href} item={item} isMobile={isMobile} />)}
            </nav>
        </div>
        <div className="mt-auto p-4">
            {user ? (
                <div className="grid gap-2">
                    <UserProfileLink isMobile={isMobile}>
                        <Link href="/app/profile">
                            <Button variant="ghost" className="w-full justify-start">
                                <User className="h-4 w-4 mr-2" />
                                <span>Profile</span>
                            </Button>
                        </Link>
                     </UserProfileLink>
                     <Button variant="secondary" onClick={handleSignOut} className="w-full justify-start">
                        <LogOut className="h-4 w-4 mr-2" />
                         <span>Sign Out</span>
                    </Button>
                 </div>
            ) : (
                <div className="grid gap-2">
                    <UserProfileLink isMobile={isMobile}>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">
                               <LogIn className="mr-2 h-4 w-4"/>
                                <span>Login</span>
                            </Button>
                        </Link>
                    </UserProfileLink>
                     <UserProfileLink isMobile={isMobile}>
                        <Link href="/signup">
                            <Button className="w-full">
                               <span>Sign Up</span>
                            </Button>
                        </Link>
                    </UserProfileLink>
                </div>
            )}
        </div>
    </div>
    )
};


export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
    return <SidebarContent isMobile={isMobile} />;
}
