const { footer, logo } = require('../common/constants/embeds');
const { commands, channels } = require('../common/constants/discord');
const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  async AdminEmbed(props) {
    const { tournament } = props;
    try {
      const {
        title,
        description,
        organizer_id,
        timestamp,
        game_mode,
        publish_channel_id,
        status,
        checkin_active,
        invited_roles,
      } = tournament;

      const embed = new EmbedBuilder()
        .setTitle(`GCR Tournament Configuration `)
        .setColor(0x00b9ff)
        .setDescription(`Organizer: <@${organizer_id}>`)
        .setThumbnail(logo)
        .setFooter(footer)
        .addFields({
          name: '\u200B',
          value: `📝 Name: **${title}** \n📆 When: **${timestamp}** \n📝 Game Mode: **${game_mode}** \n👥 Who: **${
            invited_roles ? invited_roles : 'Not Specified'
          }**\n \u200B \n📝 Info: \n*${description}* \n \u200B`,
        })

        .addFields(
          // { name: '\u200B', value: '\u200B' },
          {
            name: '**BUTTONS**',
            value: `🏁 Start tournament \n✅ Start check in feature\n📣 Posts tourney to <#${publish_channel_id}> \n⛔ Removes posted announcement \n✏️ Edits tournament details \n🎮 Edits tournament game mode \n👥 Invite roles to tournament \n🗑️ Deletes the tournament `,
          },
        );

      const row1 = new ActionRowBuilder().addComponents(
        start({ isDisabled: false }),
        editDetails(),
        editGameMode(),
        startCheckin({ isDisabled: checkin_active }),
        editStartDate(),
      );
      const row2 = new ActionRowBuilder().addComponents(
        inviteRoles(),
        publish({ isDisabled: status === 'published' }),
        unpublish({ isDisabled: status === 'draft' }),
        deleteTournament(),
      );

      return {
        embeds: [embed],
        components: [row1, row2],
        ephemeral: false,
        allowed_mentions: {
          parse: [],
        },
      };
    } catch (error) {
      console.log(error);
    }
  },
};

const start = ({ isDisabled = false, ...props }) => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setEmoji('🏁')
      // .setLabel(`Start`)
      .setCustomId('start_tourney')
      .setDisabled(isDisabled || false)
  );
};

const publish = ({ isDisabled = false, ...props }) => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('📣')
      // .setLabel(`Post`)
      .setCustomId('post_tourney')
      .setDisabled(isDisabled || false)
  );
};

const unpublish = ({ isDisabled = false, ...props }) => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('⛔')
      // .setLabel(`Unpost`)
      .setCustomId('unpost_tourney')
      .setDisabled(isDisabled || false)
  );
};

const startCheckin = ({ isDisabled = false, ...props }) => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('✅')
      // .setLabel(`Checkin`)
      .setCustomId('start_tourney_checkin')
      .setDisabled(isDisabled || false)
  );
};

const deleteTournament = () => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setEmoji('🗑️')
      // .setLabel(`Delete`)
      .setCustomId('confirm_message')
  );
};

const editDetails = () => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('✏️')
      // .setLabel(`Edit`)
      .setCustomId('show_edit_tournament')
  );
};

const editGameMode = () => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🎮')
      // .setLabel(`Mode`)
      .setCustomId('edit_game_mode')
  );
};

const editStartDate = () => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🗓')
      // .setLabel(`Date`)
      .setCustomId('edit_start_date')
  );
};

const inviteRoles = () => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setEmoji('👥')
      // .setLabel(`Roles`)
      .setCustomId('invite_roles')
  );
};
