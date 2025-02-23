import { NextResponse } from 'next/server';
import { exec } from 'child_process';

export async function POST(): Promise<Response> {
  try {
    await new Promise<void>((resolve, reject) => {
      exec('bun run src/bot/deploy-commands.ts && bun run src/bot/index.ts', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting bot: ${error.message}`);
          reject(error);
          return;
        }
        console.log(`Bot started: ${stdout}`);
        resolve();
      });
    });

    return NextResponse.json({ message: 'Bot started successfully' });
  } catch (error) {
    console.error('Failed to start bot:', error);
    return NextResponse.json(
      { error: 'Failed to start bot' },
      { status: 500 }
    );
  }
} 