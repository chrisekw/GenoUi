
'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// This is now the root page, which will redirect to the new landing page.
export default function Home() {
  useEffect(() => {
    redirect('/landing');
  }, []);

  return null;
}
