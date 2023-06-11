const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "starttourney",
  guildOnly: true,
  data: new SlashCommandBuilder().setName("start").setDescription("Start a new tournement"),
  async execute(interaction) {
    const cancel = () =>
      new ButtonBuilder().setCustomId("cancel").setLabel("Cancel").setStyle(ButtonStyle.Secondary);

    const start = (buttonConfig) => {
      const { isDisabled } = buttonConfig;
      return new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🏆")
        .setLabel(`Start Tourney`)
        .setCustomId("start_tourney")
        .setDisabled(isDisabled);
    };
    const gameMode = (selection) =>
      new StringSelectMenuBuilder()
        .setCustomId("game_mode")
        .setPlaceholder(
          (selection === "1v1"
            ? "1v1 Duels Tournament"
            : "2v2"
            ? "2v2 Doubles Tournament"
            : "3v3 Standard Tournament") || "Select Game Mode"
        )
        .addOptions(
          new StringSelectMenuOptionBuilder().setLabel("(1v1) Duels Tournament").setValue("1v1"),
          new StringSelectMenuOptionBuilder().setLabel("(2v2) Doubles Tournament").setValue("2v2"),
          new StringSelectMenuOptionBuilder().setLabel("(3v3) Standard Tournament").setValue("3v3")
        );

    const row1 = (selection) => new ActionRowBuilder().addComponents([gameMode(selection)]);
    const row2 = (buttonConfig) =>
      new ActionRowBuilder().addComponents(cancel(), start(buttonConfig));

    const collectorFilter = (i) => {
      i.deferUpdate();
      return i.user.id === interaction.user.id;
    };

    const response = await interaction.reply({
      content: `Select option to start tournament.`,
      components: [row1(), row2({ isDisabled: true })],
    });

    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 3_600_000,
    });

    collector.on("collect", async (i) => {
      try {
        const selection = i.values[0];

        await i.update({
          components: [row1(selection), row2({ isDisabled: false })],
        });
        await i.reply(`${i.user} has selected ${selection}!`);
      } catch (error) {
        console.log(error);
      }
    });
  },
};
