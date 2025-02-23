'use client';

import { useEffect, useState, useCallback } from 'react';

type Command = {
  id: string;
  name: string;
  description: string;
  response: string;
};

interface CommandListProps {
  guildId: string;
}

export function CommandList({ guildId }: CommandListProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommands = useCallback(async () => {
    if (!guildId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/guilds/${guildId}/commands`);
      if (!response.ok) throw new Error('Failed to fetch commands');
      const data = await response.json();
      setCommands(data);
    } catch (error) {
      console.error('Failed to fetch commands:', error);
      setError('Failed to fetch commands');
    } finally {
      setIsLoading(false);
    }
  }, [guildId]);

  useEffect(() => {
    fetchCommands();
  }, [guildId, fetchCommands]);

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <p className="text-zinc-400">Loading commands...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {commands.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-zinc-400">No commands found</p>
        </div>
      ) : (
        commands.map((command) => (
          <div
            key={command.id}
            className="p-4 rounded-lg bg-zinc-800 border border-zinc-700"
          >
            <h3 className="text-lg font-medium">{command.name}</h3>
            <p className="text-zinc-400 mt-1">{command.description}</p>
            <p className="text-sm text-zinc-500 mt-2">Response: {command.response}</p>
          </div>
        ))
      )}
    </div>
  );
} 