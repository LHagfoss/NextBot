'use client';

import { signIn } from 'next-auth/react';
import { Suspense } from 'react';

function LoginContent() {
  const handleLogin = async () => {
    try {
      await signIn('discord', {
        callbackUrl: '/dashboard'
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Login with Discord
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}