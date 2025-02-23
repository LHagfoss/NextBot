import { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction,
    PermissionFlagsBits
} from 'discord.js';
  
export const help = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Displays a list of all commands'),
  
    async execute(interaction: ChatInputCommandInteraction) {
      
      await interaction.reply({
        content: 'Pong!',
        ephemeral: true
      });
    }
};