import { NextResponse } from 'next/server';
import { exec } from 'child_process';

let isOnline = false;
let serverCount = 0;

const fetchServerCount = async () => {
  try {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch guilds');
    }

    const guilds = await response.json();
    serverCount = guilds.length;
  } catch (error) {
    console.error('Error fetching server count:', error);
    serverCount = 0;
  }
};

const startBot = () => {
  exec('bun run src/bot/deploy-commands.ts && bun run src/bot/index.ts', (error) => {
    if (error) {
      console.error(`Error starting bot: ${error.message}`);
      isOnline = false;
      return;
    }
    isOnline = true;
    fetchServerCount();
  });
};

startBot();

export async function GET() {
  return NextResponse.json({
    status: isOnline ? 'Online' : 'Offline',
    serverCount,
  });
};