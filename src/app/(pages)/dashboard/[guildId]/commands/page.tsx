'use client';

import Navbar from '@/components/navbar';
import Link from 'next/link';
import { CommandList } from '@/components/command-list';
import { useParams, useRouter } from 'next/navigation';

export default function GuildCommandsPage() {
  const params = useParams();
  const router = useRouter();
  const guildId = params.guildId as string;

  if (!guildId) {
    router.push('/dashboard');
    return null;
  }

  return (
    <main className="w-screen min-h-screen p-5">
      <Navbar />
      
      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push(`/dashboard/${guildId}`)}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Server Commands</h1>
        </div>

        <div className="flex justify-between items-center mb-8">
          <p className="text-zinc-400">Manage custom commands for your server</p>
          <Link
            href={`/dashboard/${guildId}/commands/new`}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create New Command
          </Link>
        </div>

        <CommandList guildId={guildId} />
      </div>
    </main>
  );
} 