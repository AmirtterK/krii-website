'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { moderator, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (moderator) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [moderator, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}