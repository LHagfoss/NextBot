import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction, 
  PermissionFlagsBits,
  ChannelType,
  Guild,
  Collection,
  Role,
  GuildBasedChannel,
  TextChannel
} from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const backup = {
  data: new SlashCommandBuilder()
    .setName('backup')
    .setDescription('Manage server backups')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a new backup')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Name of the backup')
            .setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('restore')
        .setDescription('Restore a backup')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Name of the backup to restore')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a backup')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Name of the backup to remove')
            .setRequired(true)))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'create') {
      await handleBackupCreate(interaction);
    } else if (subcommand === 'restore') {
      await handleBackupRestore(interaction);
    } else if (subcommand === 'remove') {
      await handleBackupRemove(interaction);
    }
  }
};

async function handleBackupCreate(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: 64 });
  
  const guild = interaction.guild;
  if (!guild) {
    await interaction.editReply('This command can only be used in a server!');
    return;
  }

  try {
    const roles = await guild.roles.fetch();
    const channels = await guild.channels.fetch();

    const backupData = {
      roles: Array.from(roles.values()).map(role => ({
        id: role.id,
        name: role.name,
        color: role.hexColor,
        hoist: role.hoist,
        permissions: role.permissions.bitfield.toString(),
        position: role.position,
        mentionable: role.mentionable,
      })),
      channels: Array.from(channels.values()).map(channel => ({
        id: channel?.id ?? '',
        name: channel?.name ?? '',
        type: channel?.type ?? 0,
        position: channel?.position ?? 0,
        parentId: channel?.parentId ?? null,
        permissionOverwrites: Array.from(channel?.permissionOverwrites.cache.values() ?? []).map(perm => ({
          id: perm.id,
          type: perm.type,
          allow: perm.allow.bitfield.toString(),
          deny: perm.deny.bitfield.toString(),
        })),
      })),
      settings: {
        name: guild.name,
        icon: guild.icon,
        verificationLevel: guild.verificationLevel,
        explicitContentFilter: guild.explicitContentFilter,
        defaultMessageNotifications: guild.defaultMessageNotifications,
      }
    };

    await prisma.backup.create({
      data: {
        guildId: guild.id,
        name: interaction.options.getString('name') || new Date().toISOString(),
        data: backupData,
      }
    });

    await interaction.editReply('Backup created successfully!');
  } catch (error) {
    console.error('Backup creation error:', error);
    await interaction.editReply('Failed to create backup!');
  }
}

async function handleBackupRestore(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: 64 });

  const guild = interaction.guild;
  if (!guild) {
    await interaction.editReply('This command can only be used in a server!');
    return;
  }

  const backupName = interaction.options.getString('name', true);

  try {
    const progressChannel = await guild.channels.create({
      name: 'backup-progress',
      type: ChannelType.GuildText,
    }) as TextChannel;

    await progressChannel.send('Starting backup restoration process...');

    const backup = await prisma.backup.findFirst({
      where: {
        guildId: guild.id,
        name: backupName
      }
    });

    if (!backup) {
      await progressChannel.send('❌ Backup not found!');
      await progressChannel.delete();
      await interaction.editReply('Backup not found!');
      return;
    }

    const data = backup.data as any;

    await interaction.editReply('Starting restore process... Check #backup-progress for details');
    await restoreGuild(guild, data, progressChannel);
    await progressChannel.send('✅ Restoration completed successfully!');
    await interaction.editReply('Server restored successfully!');

    setTimeout(() => progressChannel.delete(), 5000);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Restore error:', error);
    await interaction.editReply(`Failed to restore the backup! Error: ${errorMessage}`);
  }
}

async function handleBackupRemove(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ flags: 64 });

  const guild = interaction.guild;
  if (!guild) {
    await interaction.editReply('This command can only be used in a server!');
    return;
  }

  const backupName = interaction.options.getString('name', true);

  try {
    const backup = await prisma.backup.findFirst({
      where: {
        guildId: guild.id,
        name: backupName
      }
    });

    if (!backup) {
      await interaction.editReply('Backup not found!');
      return;
    }

    await prisma.backup.delete({
      where: {
        id: backup.id
      }
    });

    await interaction.editReply('Backup removed successfully!');
  } catch (error) {
    console.error('Backup removal error:', error);
    await interaction.editReply('Failed to remove backup!');
  }
}

async function restoreGuild(guild: Guild, data: any, progressChannel: TextChannel) {
  try {
    await progressChannel.send('🔄 Deleting existing roles...');
    const existingRoles = await guild.roles.fetch();
    for (const [, role] of existingRoles) {
      if (role.name !== '@everyone' && !role.managed) {
        try {
          await role.delete();
        } catch (error) {
          await progressChannel.send(`⚠️ Failed to delete role ${role.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    await progressChannel.send('🔄 Deleting existing channels...');
    const existingChannels = await guild.channels.fetch();
    for (const [, channel] of existingChannels) {
      if (channel && channel.id !== progressChannel.id) {
        try {
          await channel.delete();
        } catch (error) {
          await progressChannel.send(`⚠️ Failed to delete channel ${channel.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    await progressChannel.send('🔄 Restoring server settings...');
    await guild.edit({
      name: data.settings.name,
      verificationLevel: data.settings.verificationLevel,
      explicitContentFilter: data.settings.explicitContentFilter,
      defaultMessageNotifications: data.settings.defaultMessageNotifications,
    });

    if (data.settings.icon) {
      try {
        await guild.setIcon(data.settings.icon);
      } catch (error) {
        await progressChannel.send(`⚠️ Failed to update server icon: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    await progressChannel.send('🔄 Creating roles...');
    const roleMap = new Map<string, string>();
    const sortedRoles = [...data.roles].sort((a: any, b: any) => a.position - b.position);
    
    for (const roleData of sortedRoles) {
      if (roleData.name !== '@everyone') {
        try {
          const newRole = await guild.roles.create({
            name: roleData.name,
            color: roleData.color,
            hoist: roleData.hoist,
            permissions: BigInt(roleData.permissions),
            position: roleData.position,
            mentionable: roleData.mentionable,
          });
          roleMap.set(roleData.id, newRole.id);
          await progressChannel.send(`✅ Created role: ${roleData.name}`);
        } catch (error) {
          await progressChannel.send(`⚠️ Failed to create role ${roleData.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    await progressChannel.send('🔄 Creating categories...');
    const categoryMap = new Map<string, string>();
    for (const channelData of data.channels) {
      if (channelData.type === ChannelType.GuildCategory) {
        try {
          const category = await guild.channels.create({
            name: channelData.name,
            type: ChannelType.GuildCategory,
            position: channelData.position,
            permissionOverwrites: channelData.permissionOverwrites.map((override: any) => ({
              id: roleMap.get(override.id) || override.id,
              allow: BigInt(override.allow),
              deny: BigInt(override.deny),
            })),
          });
          categoryMap.set(channelData.id, category.id);
          await progressChannel.send(`✅ Created category: ${channelData.name}`);
        } catch (error) {
          await progressChannel.send(`⚠️ Failed to create category ${channelData.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    await progressChannel.send('🔄 Creating channels...');
    for (const channelData of data.channels) {
      if (channelData.type !== ChannelType.GuildCategory) {
        try {
          await guild.channels.create({
            name: channelData.name,
            type: channelData.type,
            position: channelData.position,
            parent: categoryMap.get(channelData.parentId) || null,
            permissionOverwrites: channelData.permissionOverwrites.map((override: any) => ({
              id: roleMap.get(override.id) || override.id,
              allow: BigInt(override.allow),
              deny: BigInt(override.deny),
            })),
          });
          await progressChannel.send(`✅ Created channel: ${channelData.name}`);
        } catch (error) {
          await progressChannel.send(`⚠️ Failed to create channel ${channelData.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    await progressChannel.send(`❌ Fatal error during restoration: ${errorMessage}`);
    console.error('Guild restoration error:', error);
    throw error;
  };
};