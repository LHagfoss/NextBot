import { Client, GatewayIntentBits, Collection, Events } from 'discord.js';
import { config } from 'dotenv';
import { commands } from './commands';
import { PrismaClient } from '@prisma/client';
import { Command } from './commands/command';

config();

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

const prisma = new PrismaClient();

client.commands = new Collection<string, Command>();

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
  console.log('Registered commands:', Array.from(client.commands.keys()));
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (command) {
    try {
      await command.execute(interaction);
      return;
    } catch (error) {
      console.error('Command execution error:', error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'There was an error executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.editReply('There was an error executing this command!');
      }
      return;
    }
  }

  try {
    const customCommand = await prisma.command.findFirst({
      where: {
        guildId: interaction.guildId ?? '',
        name: interaction.commandName
      }
    });

    if (customCommand) {
      await interaction.reply(customCommand.response);
    }
  } catch (error) {
    console.error('Custom command execution error:', error);
    await interaction.reply({
      content: 'There was an error executing this command!',
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);