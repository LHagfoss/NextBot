import { 
  SlashCommandBuilder, 
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
} from 'discord.js';

export const interact = {
  data: new SlashCommandBuilder()
    .setName('interact')
    .setDescription('Interactive button test'),

  async execute(interaction: ChatInputCommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary_button')
          .setLabel('Primary Button')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('secondary_button')
          .setLabel('Secondary Button')
          .setStyle(ButtonStyle.Secondary),
      );

    const response = await interaction.reply({
      content: 'Click a button!',
      components: [row],
    });

    try {
      const confirmation = await response.awaitMessageComponent({ 
        time: 60000,
        componentType: ComponentType.Button
      });

      if (confirmation.customId === 'primary_button') {
        await confirmation.update({ 
          content: 'You clicked the primary button! 🎉', 
          components: [] 
        });
      } else if (confirmation.customId === 'secondary_button') {
        await confirmation.update({ 
          content: 'You clicked the secondary button! 🎈', 
          components: [] 
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: 'No button was clicked within 1 minute, interaction expired!',
        components: []
      });
    }
  }
}; 