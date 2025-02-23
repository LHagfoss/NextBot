import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  PermissionFlagsBits
} from 'discord.js';

export const ping = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if the bot is alive'),

  async execute(interaction: ChatInputCommandInteraction) {
    console.log(`Ping command executed by ${interaction.user.tag}`);
    
    await interaction.reply({
      content: 'Pong!',
      ephemeral: true
    });
  }
};