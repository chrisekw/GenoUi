
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
import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from "react";
import { login } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        title: 'Login Failed',
        description: state.message,
        variant: 'destructive',
      });
    } else if (state.message === 'Success') {
        toast({ title: 'Login successful!', description: 'Redirecting...' });
        // The FirebaseAuthProvider will handle the redirect.
    }
  }, [state, toast, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <Link href="/landing" className="flex items-center justify-center gap-2 mb-4">
                <Logo className="w-7 h-7" />
                <span className="text-xl font-bold">GenoUI</span>
            </Link>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <SubmitButton />
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
