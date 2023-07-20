const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

const manageTeamsEmbed = ({
  tournament,
  teamCount,
  remainingMessage,
  ...props
}) => {
  const { organizer_id } = tournament;

  try {
    const embed = new EmbedBuilder()
      .setTitle(`Manage Teams`)
      .setDescription(
        'Review teams before creating voice channels. Once teams have been moved to VCs this action can not be undone.',
      )
      .setFields({
        name: '\u200B',
        value: `**Teams:** ${teamCount.toString()} \n**Status:** ${remainingMessage}`,
      })
      .setColor(0x0099ff);

    const sendToVoiceButton = () => {
      return new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setEmoji(`🔈`)
        .setLabel(`Transfer to Voice Channels`)
        .setCustomId('send_to_voice');
    };
    const removeAllTeamsButton = () => {
      return new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setEmoji(`🗑`)
        .setLabel(`Remove All`)
        .setCustomId('remove_all_teams');
    };

    const row = new ActionRowBuilder().addComponents(
      sendToVoiceButton(),
      removeAllTeamsButton(),
    );

    return {
      content: `<@${organizer_id}>`,
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
