import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const guildId = request.nextUrl.searchParams.get('guildId');
    if (!guildId) {
      return NextResponse.json({ error: 'Guild ID is required' }, { status: 400 });
    }

    const commands = await prisma.command.findMany({
      where: { guildId },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(commands);
  } catch (error) {
    console.error('Error fetching commands:', error);
    return NextResponse.json({ error: 'Failed to fetch commands' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { guildId, name, description, response } = body;

    if (!guildId || !name || !description || !response) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const command = await prisma.command.create({
      data: {
        guildId,
        name,
        description,
        response
      }
    });

    return NextResponse.json(command);
  } catch (error) {
    console.error('Error creating command:', error);
    return NextResponse.json({ error: 'Failed to create command' }, { status: 500 });
  }
} 