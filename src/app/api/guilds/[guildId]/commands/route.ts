import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const guildId = request.nextUrl.pathname.split('/')[3];
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const commands = await prisma.command.findMany({
      where: { guildId },
    });

    return NextResponse.json(commands);
  } catch (error) {
    console.error('Error fetching commands:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const guildId = request.nextUrl.pathname.split('/')[3];
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, response } = body;

    const command = await prisma.command.create({
      data: {
        guildId,
        name,
        description,
        response,
      },
    });

    return NextResponse.json(command, { status: 201 });
  } catch (error) {
    console.error('Error creating command:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 