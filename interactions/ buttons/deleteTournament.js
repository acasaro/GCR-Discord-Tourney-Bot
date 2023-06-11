const { config } = require("../../config");

module.exports = {
  id: "delete_tournament",
  async execute(interaction) {
    const categoryId = interaction.channel.parentId;
    const channelsToDelete = await interaction.client.channels.cache.filter(
      (channel) => channel.id === categoryId || channel.parentId === categoryId
    );
    channelsToDelete.forEach((channel) => {
      channel.delete();
    });
    await interaction.deferUpdate();
    return;
  },
};
