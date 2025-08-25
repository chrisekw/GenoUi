
'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// This is now the root page, which will redirect to the new landing page.
export default function Home() {
  useEffect(() => {
    // This could also check for an auth cookie and redirect to /app/dashboard if logged in.
    redirect('/landing');
  }, []);

  return null;
}
