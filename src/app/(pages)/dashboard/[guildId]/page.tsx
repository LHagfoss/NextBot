'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Link from 'next/link';

interface Command {
  name: string;
  description: string;
  enabled: boolean;
}

interface LastBackup {
  id: string;
  guildId: string;
  name: string;
  timestamp: Date;
  data: any; 
}

interface Channel {
  id: string;
  name: string;
}

export default function ServerDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const guildId = params.guildId;
  const [activeTab, setActiveTab] = useState('backups');
  const [commands, setCommands] = useState<Command[]>([
    { name: 'backup', description: 'Manage server backups', enabled: true },
    { name: 'backups', description: 'List all backups', enabled: true },
    { name: 'ping', description: 'Check if bot is alive', enabled: true },
    { name: 'time', description: 'Display current time', enabled: true },
  ]);
  const [lastBackup, setLastBackup] = useState<LastBackup | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchLastBackup = async () => {
      try {
        const response = await fetch(`/api/guilds/${guildId}/backups/last`);
        if (!response.ok) throw new Error('Failed to fetch last backup');
        const data: LastBackup = await response.json();
        setLastBackup(data);
      } catch (error) {
        console.error('Failed to fetch last backup:', error);
      }
    };

    fetchLastBackup();
  }, [guildId]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/guilds/${guildId}/channels`);
        if (!response.ok) throw new Error('Failed to fetch channels');
        const data: Channel[] = await response.json();
        setChannels(data);
      } catch (error) {
        console.error('Failed to fetch channels:', error);
      }
    };

    fetchChannels();
  }, [guildId]);

  const handleCreateBackup = async () => {
    try {
      const backupData = {
        name: `Backup-${new Date().toISOString()}`,
        data: {}, 
      };

      const response = await fetch(`/api/guilds/${guildId}/backups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backupData),
      });

      if (!response.ok) throw new Error('Failed to create backup');
      alert('Backup created successfully!');
    } catch (error) {
      console.error('Failed to create backup:', error);
      alert('Failed to create backup');
    }
  };

  const handleViewBackups = () => {
    router.push(`/dashboard/${guildId}/backups`);
  };

  return (
    <main className="w-screen min-h-screen p-5">
      <Navbar />
      
      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            ← Back to Servers
          </button>
          <h1 className="text-3xl font-bold">Server Dashboard</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 justify-between">
            <div className="flex gap-4">
                <button
                    onClick={() => setActiveTab('backups')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'backups' ? 'bg-indigo-600' : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                >
                    Backups
                </button>
                <Link 
                    href={`/dashboard/${guildId}/commands`}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === 'settings' ? 'bg-indigo-600' : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                >
                    Commands
                </Link>
            </div>

            <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-indigo-600' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
            >
                Settings
            </button>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'backups' && (
            <div className="p-6 rounded-lg bg-zinc-800">
              <h2 className="text-xl font-semibold mb-4">Backup Management</h2>
              {lastBackup ? (
                <div className="mb-4">
                  <p className="text-zinc-400">Last Backup:</p>
                  <p className="text-lg font-medium">{lastBackup.name}</p>
                  <p className="text-sm text-zinc-500">
                    Created at: {new Date(lastBackup.timestamp).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="text-zinc-400">No backups found.</p>
              )}
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={handleCreateBackup}
                  className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create Backup
                </button>
                <button 
                  onClick={handleViewBackups}
                  className="px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  View Backups
                </button>
              </div>
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="p-6 rounded-lg bg-zinc-800">
              <h2 className="text-xl font-semibold mb-4">Command Management</h2>
              <div className="space-y-4">
                {commands.map((command) => (
                  <div 
                    key={command.name}
                    className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{command.name}</h3>
                      <p className="text-sm text-zinc-400">{command.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={command.enabled}
                        onChange={() => {
                          setCommands(commands.map(cmd => 
                            cmd.name === command.name 
                              ? { ...cmd, enabled: !cmd.enabled }
                              : cmd
                          ));
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-zinc-800">
                <h3 className="text-xl font-bold mb-4">Welcome Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label>Welcome Channel</label>
                    <select className="w-full bg-zinc-700 rounded">
                      {channels.map(channel => (
                        <option key={channel.id} value={channel.id}>{channel.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Welcome Message</label>
                    <textarea 
                      className="w-full bg-zinc-700 rounded"
                      placeholder="Welcome {user} to {server}!"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-zinc-800">
                <h3 className="text-xl font-bold mb-4">Auto-Moderation</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Anti-Spam Protection</span>
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Link Filter</span>
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mass Mention Prevention</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-zinc-800">
                <h3 className="text-xl font-bold mb-4">Logging</h3>
                <div className="space-y-4">
                  <div>
                    <label>Log Channel</label>
                    <select className="w-full bg-zinc-700 rounded">
                      {channels.map(channel => (
                        <option key={channel.id} value={channel.id}>{channel.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="logMessages" />
                      <label htmlFor="logMessages">Message Events</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="logMembers" />
                      <label htmlFor="logMembers">Member Events</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 