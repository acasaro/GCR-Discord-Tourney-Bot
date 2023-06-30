const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const { logError } = require('../common/utility-logging');

const TeamEmbedMessage = ({ interaction, team, ...props }) => {
  const { teamName } = team;
  const { client } = interaction;
  const emoji = emojiID => client.emojis.cache.get(emojiID);
  let playerList = '';

  team.players.forEach(
    (player, index) =>
      (playerList = playerList.concat(
        `\n<@${player.discord_id}> - ${emoji(player.emoji_id)} ${
          player.rank_role_name
        } `,
      )),
  );

  try {
    const teamEmbed = new EmbedBuilder()
      .setDescription(playerList)
      .setColor(0x00ffff);

    const kickTeam = () => {
      return (
        new ButtonBuilder()
          .setStyle(ButtonStyle.Danger)
          // .setEmoji(checkinActive ? `✔️` : `🚫`)
          .setLabel(`Remove`)
          .setCustomId('remove_team')
      );
    };

    const row = new ActionRowBuilder().addComponents(kickTeam());

    return {
      content: `**${teamName}**`,
      embeds: [teamEmbed],
      components: [row],
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  TeamEmbedMessage,
};
