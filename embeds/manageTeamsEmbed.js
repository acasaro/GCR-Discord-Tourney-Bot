const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

const manageTeamsEmbed = ({ tournament, ...props }) => {
  const { organizer_id } = tournament;

  try {
    const embed = new EmbedBuilder()
      .setTitle(`Manage Generated Teams Here`)
      .setDescription(
        `<@${organizer_id}> Use this thread to review teams that were generated before sending them to voice channels.`,
      )
      .setColor(0x0099ff);

    const sendToVoiceButton = () => {
      return new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`🔈`)
        .setLabel(`Create Voice Channels`)
        .setCustomId('send_to_voice');
    };

    const row = new ActionRowBuilder().addComponents(sendToVoiceButton());

    return {
      embeds: [embed],
      components: [row],
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  manageTeamsEmbed,
};
