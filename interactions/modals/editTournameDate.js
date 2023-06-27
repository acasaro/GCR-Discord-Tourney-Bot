const { AdminEmbed } = require('../../embeds/adminEmbed-alt');
const {
  getTournamentByCategoryId,
  updateTournament,
  updateCategoryChannelName,
} = require('../../common/utility-functions');
const dayjs = require('dayjs');
const { time } = require('discord.js');

module.exports = {
  id: 'tournament_date_modal',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    const { guild, channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    // Get modal input fields
    const startDate = interaction.fields.getTextInputValue('start_date');
    const startTime = interaction.fields.getTextInputValue('start_time');

    const date = dayjs(`${startDate} ${startTime}`).$d;
    const timeString = time(date);

    // Merge tournament values with new modal values
    const { admin_message_id } = tournament;

    // Update tournament in DB
    await updateTournament(tournament.id, {
      start_date: timeString,
    });

    // Edit Admin message with updated values
    const adminMessage = await interaction.channel.messages.fetch(
      admin_message_id,
    );

    const updatedAdminMessage = await AdminEmbed({
      tournament: {
        ...tournament,
        start_date: startDate,
        start_time: startTime,
        timestamp: timeString,
      },
    });

    await adminMessage.edit(updatedAdminMessage);

    await interaction.deferUpdate();
    return;
  },
};
