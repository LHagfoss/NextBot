import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  REST,
  Routes
} from 'discord.js';
import { PrismaClient } from '@prisma/client';
import { Command } from './command';

const prisma = new PrismaClient();
const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

export const commandManager: Command = {
  data: new SlashCommandBuilder()
    .setName('command')
    .setDescription('Manage bot commands')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a new command')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Name of the command')
            .setRequired(true))
        .addStringOption(option =>
          option
            .setName('description')
            .setDescription('Description of the command')
            .setRequired(true))
        .addStringOption(option =>
          option
            .setName('response')
            .setDescription('Response message for the command')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('Delete an existing command')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Name of the command to delete')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List all custom commands'))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) as SlashCommandBuilder,

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'create':
        await handleCommandCreate(interaction);
        break;
      case 'delete':
        await handleCommandDelete(interaction);
        break;
      case 'list':
        await handleCommandList(interaction);
        break;
    }
  }
};

async function deployCustomCommands(guildId: string) {
  try {
    const customCommands = await prisma.command.findMany({
      where: { guildId }
    });

    const commandData = customCommands.map(cmd => ({
      name: cmd.name,
      description: cmd.description,
      type: 1
    }));

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, guildId),
      { body: commandData }
    );
  } catch (error) {
    console.error('Error deploying custom commands:', error);
  }
}

async function handleCommandCreate(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    await interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  
  const name = interaction.options.getString('name', true);
  const description = interaction.options.getString('description', true);
  const response = interaction.options.getString('response', true);

  try {
    await prisma.command.create({
      data: {
        guildId: interaction.guildId,
        name,
        description,
        response
      }
    });

    // Deploy the new command to Discord
    await deployCustomCommands(interaction.guildId);
    
    await interaction.editReply(`Command "${name}" created successfully!`);
  } catch (error) {
    console.error('Error creating command:', error);
    await interaction.editReply('Failed to create command. Please try again.');
  }
}

async function handleCommandDelete(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    await interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
    return;
  }

  await interaction.deferReply({ ephemeral: true });
  
  const name = interaction.options.getString('name', true);

  try {
    await prisma.command.delete({
      where: {
        guildId_name: {
          guildId: interaction.guildId,
          name: name
        }
      }
    });

    // Re-deploy commands to Discord
    await deployCustomCommands(interaction.guildId);

    await interaction.editReply(`Command "${name}" deleted successfully!`);
  } catch (error) {
    console.error('Error deleting command:', error);
    await interaction.editReply('Failed to delete command. Please try again.');
  }
}

async function handleCommandList(interaction: ChatInputCommandInteraction) {
  if (!interaction.guildId) {
    await interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
    return;
  }

  await interaction.deferReply({ ephemeral: true });

  try {
    const commands = await prisma.command.findMany({
      where: {
        guildId: interaction.guildId
      },
      orderBy: {
        name: 'asc'
      }
    });

    if (commands.length === 0) {
      await interaction.editReply('No custom commands found.');
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('Custom Commands')
      .setColor('#0099ff')
      .setDescription('Here are all the custom commands for this server:')
      .addFields(
        commands.map(cmd => ({
          name: cmd.name,
          value: cmd.description,
          inline: true
        }))
      )
      .setFooter({ text: `Total commands: ${commands.length}` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error('Error listing commands:', error);
    await interaction.editReply('Failed to list commands. Please try again.');
  }
} 