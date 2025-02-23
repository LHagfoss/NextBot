import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const guildId = request.nextUrl.pathname.split('/')[3];

    const backup = await prisma.backup.findFirst({
      where: { guildId },
      orderBy: { createdAt: 'desc' },
    });

    if (!backup) {
      return NextResponse.json(
        { error: 'No backups found' },
        { status: 404 }
      );
    }

    return NextResponse.json(backup);
  } catch (error) {
    console.error('Error fetching last backup:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 