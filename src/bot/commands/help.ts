import { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} from 'discord.js';

const COMMANDS_PER_PAGE = 5;

export const help = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Displays a list of all commands'),
  
    async execute(interaction: ChatInputCommandInteraction) {
      const commands = Array.from(interaction.client.commands.values());
      const totalPages = Math.ceil(commands.length / COMMANDS_PER_PAGE);
      let currentPage = 0;

      const generateEmbed = (page: number) => {
        const start = page * COMMANDS_PER_PAGE;
        const end = start + COMMANDS_PER_PAGE;
        const currentCommands = commands.slice(start, end);

        return new EmbedBuilder()
          .setColor('#000000')
          .setTitle('📚 Command List')
          .setDescription('Here are all available commands:')
          .addFields(
            currentCommands.map(cmd => ({
              name: `/${cmd.data.name}`,
              value: cmd.data.description,
              inline: false
            }))
          )
          .setFooter({ text: `Page ${page + 1}/${totalPages}` })
          .setTimestamp();
      };

      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('◀️ Previous')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === 0),
          new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next ▶️')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === totalPages - 1)
        );

      const response = await interaction.reply({
        embeds: [generateEmbed(currentPage)],
        components: [row],
        ephemeral: true
      });

      const collector = response.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 60000
      });

      collector.on('collect', async (i) => {
        if (i.customId === 'prev' && currentPage > 0) {
          currentPage--;
        } else if (i.customId === 'next' && currentPage < totalPages - 1) {
          currentPage++;
        }

        const newRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('prev')
              .setLabel('◀️ Previous')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(currentPage === 0),
            new ButtonBuilder()
              .setCustomId('next')
              .setLabel('Next ▶️')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(currentPage === totalPages - 1)
          );

        await i.update({
          embeds: [generateEmbed(currentPage)],
          components: [newRow]
        });
      });

      collector.on('end', async () => {
        const disabledRow = new ActionRowBuilder<ButtonBuilder>()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('prev')
              .setLabel('◀️ Previous')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId('next')
              .setLabel('Next ▶️')
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(true)
          );

        await interaction.editReply({
          components: [disabledRow]
        });
      });
    }
};