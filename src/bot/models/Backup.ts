import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface BackupData {
  [key: string]: any;
  roles: Array<{
    [key: string]: any;
    name: string;
    color: string;
    hoist: boolean;
    permissions: string;
    position: number;
    mentionable: boolean;
  }>;
  channels: Array<{
    [key: string]: any;
    name: string;
    type: string;
    position: number;
    parent: string;
    permissionOverwrites: any[];
  }>;
  settings: {
    [key: string]: any;
    name: string;
    icon: string;
    verificationLevel: string;
    explicitContentFilter: string;
    defaultMessageNotifications: string;
  };
}

export const Backup = {
  create: async (guildId: string, name: string, data: BackupData) => {
    return prisma.backup.create({
      data: {
        guildId,
        name,
        data: data as Prisma.JsonObject,
      },
    });
  },

  findLatest: async (guildId: string) => {
    return prisma.backup.findFirst({
      where: { guildId },
      orderBy: { createdAt: 'desc' },
    });
  },

  findAll: async (guildId: string) => {
    return prisma.backup.findMany({
      where: { guildId },
      orderBy: { createdAt: 'desc' },
    });
  },
}; 