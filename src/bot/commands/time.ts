import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  PermissionFlagsBits
} from 'discord.js';

export const time = {
  data: new SlashCommandBuilder()
    .setName('time')
    .setDescription('Displays current time')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    const currentTime = new Date().toLocaleString();
    console.log(`Time command executed by ${interaction.user.tag}`);
    
    await interaction.reply({
      content: `Current time: ${currentTime}`,
      ephemeral: true
    });
  }
};