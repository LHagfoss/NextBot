import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch guilds');
    }

    const guilds = await response.json();
    
    // Ensure guilds is an array
    if (!Array.isArray(guilds)) {
      return NextResponse.json([], { status: 200 });
    }

    // Filter guilds where the user has admin permissions
    const adminGuilds = guilds.filter((guild) => 
      (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8)
    );

    return NextResponse.json(adminGuilds);
  } catch (error) {
    console.error('Error fetching guilds:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array instead of error
  }
} 