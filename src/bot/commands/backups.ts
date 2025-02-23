import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  EmbedBuilder,
  PermissionFlagsBits 
} from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const backups = {
  data: new SlashCommandBuilder()
    .setName('backups')
    .setDescription('List all backups for this server')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply('This command can only be used in a server!');
      return;
    }

    try {
      const backups = await prisma.backup.findMany({
        where: {
          guildId: guild.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      if (backups.length === 0) {
        await interaction.editReply('No backups found for this server.');
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('Server Backups')
        .setColor('#000000')
        .setDescription('Here are all the backups for this server:')
        .addFields(
          backups.map(backup => ({
            name: backup.name,
            value: `Created: ${backup.createdAt.toLocaleString()}`,
            inline: true
          }))
        )
        .setFooter({ text: `Total backups: ${backups.length}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching backups:', error);
      await interaction.editReply('Failed to fetch backups!');
    }
  }
};
