'use client';

import Link from "next/link";
import { InviteButton } from './invite-button';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { data: session, status } = useSession();
    const [serverCount, setServerCount] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        const fetchServerCount = async () => {
            try {
                const response = await fetch('/api/bot/status');
                const data = await response.json();
                setServerCount(data.serverCount);
            } catch (error) {
                console.error('Error fetching server count:', error);
            }
        };

        fetchServerCount();
    }, []);

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-1 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600" />
              <Link href="/"><span className="font-bold text-xl">NextBot</span></Link>
            </div>
            
            <div className="flex-1 hidden md:flex justify-center items-center gap-8 text-zinc-400">
              <Link 
                href="/dashboard" 
                prefetch
                className={`hover:text-zinc-50 transition-colors ${
                  pathname === '/dashboard' ? 'text-zinc-50' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link href="/features" className="hover:text-zinc-50 transition-colors">Features</Link>
              <Link href="/docs" className="hover:text-zinc-50 transition-colors">Documentation</Link>
            </div>
    
            <div className="flex-1 flex justify-end items-center gap-4">
              {status === 'loading' ? (
                <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
              ) : session?.user ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-zinc-400 hover:text-zinc-50 transition-colors"
                  >
                    Logout
                  </button>
                  <Image
                    src={session.user.image || ''}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <Link href="/login" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                  Login
                </Link>
              )}
              <InviteButton text="Invite to Discord" />
            </div>
          </div>
        </div>
      </nav>
    );
}