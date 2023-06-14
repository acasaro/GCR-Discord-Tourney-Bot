const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "move",
  data: new SlashCommandBuilder()
    .setName("move")
    .setDescription("Moves tournament entry portal.")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("The channel to move to.").setRequired(true)
    ),

  async execute(interaction) {
    const channelName = interaction.options.getChannel("channel");
    const channelId = channelName.id;
    console.log(await interaction.client);
    // const channel = interaction.client.channels.get(channelName);

    if (!channelId) {
      return interaction.reply(`There is no channel with name \`${channelName}\`!`);
    }
    // delete require.cache[require.resolve(`../${channel.data.name}/${channel.data.name}.js`)];

    try {
      // interaction.client.channels.delete(channel.data.name);
      // const newCommand = require(`../${channel.data.name}/${channel.data.name}.js`);
      // interaction.client.commands.set(newCommand.data.name, newCommand);
      await interaction.reply(`Moved tournament New Tournament to <#${channelName.id}>`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `There was an error while moving to channel \`${channelName.id}\`:\n\`${error.message}\``
      );
    }
  },
};
