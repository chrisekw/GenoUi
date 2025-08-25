import { redirect } from 'next/navigation';

export default function AppRedirectPage() {
    // This page is now protected and will redirect to the main generator.
    // The actual content is in /src/app/(auth)/app/page.tsx
    redirect('/login');
}
