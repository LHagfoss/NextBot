'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [botStatus, setBotStatus] = useState('Offline');
  const [serverCount, setServerCount] = useState(0);

  const fetchBotStatus = async () => {
    try {
      const response = await fetch('/api/bot/status');
      if (!response.ok) throw new Error('Failed to fetch bot status');
      const data = await response.json();
      setBotStatus(data.status);
      setServerCount(data.serverCount);
    } catch (error) {
      console.error('Error fetching bot status:', error);
    }
  };

  useEffect(() => {
    if (!session?.user?.isAdmin) {
      router.push('/');
      return;
    }

    fetchBotStatus();
  }, [session, router]);

  const handleStartBot = async () => {
    try {
      const response = await fetch('/api/bot/start', { method: 'POST' });
      if (response.ok) {
        alert('Bot started successfully!');
        await fetchBotStatus();
      } else {
        alert('Failed to start the bot.');
      }
    } catch (error) {
      console.error('Error starting the bot:', error);
    }
  };

  if (!session?.user?.isAdmin) {
    return null;
  }

  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p>Bot Status: {botStatus}</p>
      <p>Servers Count: {serverCount}</p>
      <button
        onClick={handleStartBot}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Start Bot
      </button>
    </main>
  );
} 