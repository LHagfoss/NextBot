import { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction,
} from 'discord.js';
  
export const website= {
    data: new SlashCommandBuilder()
      .setName('website')
      .setDescription('Reponds with URL to our Website'),
  
    async execute(interaction: ChatInputCommandInteraction) {
      
      await interaction.reply({
        content: '[Visit our website!](https://nextbotv1.vercel.app)',
        ephemeral: true
      });
    }
};