'use client';

import { generateBotInviteLink } from '@/lib/discord';

export function InviteButton({text}: {text: string}) {
  const handleInvite = () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    if (!clientId) {
      console.error('NEXT_PUBLIC_DISCORD_CLIENT_ID is not defined');
      return;
    }

    const inviteUrl = generateBotInviteLink(clientId);
    console.log('Redirecting to:', inviteUrl);
    window.location.href = inviteUrl;
  };

  return (
    <button
      onClick={handleInvite}
      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
    >
      {text}
    </button>
  );
} 