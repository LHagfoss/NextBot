'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/navbar';

export default function NewCommandPage() {
  const router = useRouter();
  const params = useParams();
  const guildId = params.guildId;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    response: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/guilds/${guildId}/commands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to create command');
      router.push(`/dashboard/${guildId}/commands`);
    } catch (error) {
      console.error('Failed to create command:', error);
      alert('Failed to create command');
    }
  };

  return (
    <main className="w-screen min-h-screen p-5">
      <Navbar />
      
      <div className="max-w-2xl mx-auto mt-20">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push(`/dashboard/${guildId}/commands`)}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            ← Back to Commands
          </button>
          <h1 className="text-3xl font-bold">Create New Command</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Command Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Response</label>
            <textarea
              value={formData.response}
              onChange={(e) => setFormData({ ...formData, response: e.target.value })}
              className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Command
          </button>
        </form>
      </div>
    </main>
  );
} 