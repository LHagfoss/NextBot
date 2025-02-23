'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg bg-zinc-800 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="mb-6 text-red-400">{error || 'An error occurred during authentication'}</p>
        <Link 
          href="/login"
          className="px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
} 