'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { useGuild } from '@/hooks/use-guild';
import Image from 'next/image';

interface Guild {
  id: string;
  name: string;
  icon: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setSelectedGuild } = useGuild();

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.push('/login');
    } else {
      fetchUserGuilds();
    }
  }, [session, status, router]);

  const fetchUserGuilds = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guilds', {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      });
      if (!response.ok) throw new Error('Failed to fetch guilds');
      const data = await response.json();
      setGuilds(data);
    } catch (error) {
      console.error('Failed to fetch guilds:', error);
      setGuilds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGuildSelect = (guild: Guild) => {
    setSelectedGuild(guild);
    router.push(`/dashboard/${guild.id}`);
  };

  if (loading) {
    return (
      <main className="w-screen min-h-screen flex justify-center items-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  if (!loading && guilds.length === 0) {
    return (
      <main className="w-screen min-h-screen p-5">
        <Navbar />
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <h1 className="text-3xl font-bold mb-4">No Servers Found</h1>
          <p className="text-zinc-400 mb-4">Unable to load your servers</p>
          <button
            onClick={fetchUserGuilds}
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-screen min-h-screen p-5">
      <Navbar />
      
      <div className="max-w-6xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-8">Your Servers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guilds.map((guild) => (
            <button
              key={guild.id}
              onClick={() => handleGuildSelect(guild)}
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                {guild.icon ? (
                  <Image
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={guild.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                    {guild.name.charAt(0)}
                  </div>
                )}
                <span className="font-medium">{guild.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
} 