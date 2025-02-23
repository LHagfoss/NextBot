import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const guildId = request.nextUrl.pathname.split('/')[3];
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, data } = body;

    const backup = await prisma.backup.create({
      data: {
        guildId,
        name,
        data,
      },
    });

    return NextResponse.json(backup, { status: 201 });
  } catch (error) {
    console.error('Error creating backup:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 