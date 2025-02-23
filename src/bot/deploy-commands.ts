import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { commands } from './commands';

config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token) {
  throw new Error('DISCORD_TOKEN is not defined in .env file');
}

if (!clientId) {
  throw new Error('CLIENT_ID is not defined in .env file');
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    console.log(`Using Client ID: ${clientId}`);

    const commandsData = commands.map(command => command.data.toJSON());
    console.log('Commands to register:', commandsData);

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commandsData },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error: unknown) {
    console.error('Error details:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const errorResponse = error as { response?: { status?: number; data?: unknown } };
      if (errorResponse.response) {
        console.error('Response status:', errorResponse.response.status);
        console.error('Response data:', errorResponse.response.data);
      }
    }
    process.exit(1);
  }
})(); 