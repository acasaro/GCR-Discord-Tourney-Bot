const { updateTournament } = require('../common/utility-functions');
const { AdminEmbed } = require('../embeds/adminEmbed-alt');

module.exports = {
  async execute(tournament, newAdminChannel) {
    if (tournament === null) {
      console.log('Tournament Not found!');
    } else {
      const createAdminEmbed = await AdminEmbed({
        tournament,
      });
      // Send initial admin embed to tournament admin channel
      const sendAdminEmbed = await newAdminChannel.send(createAdminEmbed);
      if (!tournament.admin_message_id) {
        // update db with admin message id to edit later
        await updateTournament(tournament.id, {
          admin_message_id: sendAdminEmbed.id.toString(),
        });
      }
    }

    return;
  },
};
