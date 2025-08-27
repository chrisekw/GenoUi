
'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/app/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Profile</h1>
            </div>
            <div className="grid w-full max-w-6xl items-start gap-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64 mt-2" />
                    </CardHeader>
                    <CardContent>
                       <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="grid gap-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                             <div className="grid gap-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-32" />
                       </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
  }

  const [firstName, lastName] = user?.displayName?.split(' ') || ['', ''];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="grid w-full max-w-6xl items-start gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                    This is your profile information from your account.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" defaultValue={firstName || 'Geno'} readOnly/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" defaultValue={lastName || 'UI'} readOnly/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user?.email || "user@example.com"} disabled />
                    </div>
                    <Button type="submit" disabled>Save Changes</Button>
                </form>
                </CardContent>
            </Card>
        </div>
    </main>
  )
}
