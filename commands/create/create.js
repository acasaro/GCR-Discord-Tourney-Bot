const Discord = require("discord.js");
const { SlashCommandBuilder, ActionRowBuilder, PermissionsBitField, ChannelType } = Discord;
const { createEmbed } = require("../../embeds/createEmbed");
const { adminEmbed } = require("../../embeds/adminEmbed");

const {
  start,
  cancel,
  publish,
  unpublish,
  startCheckin,
  deleteTournament,
  editDetails,
  create,
} = require("./createComponents");
const { config } = require("../../config");

module.exports = {
  name: "create",
  description: "Create a tournament",
  guildOnly: true,
  data: new SlashCommandBuilder().setName("create").setDescription("Create a tournament"),
  async execute(interaction) {
    const tourneyPrompt = await CreateControlsMessage({ isEphemeral: true });
    const response = await interaction.reply(tourneyPrompt);

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 600_000,
      });

      if (confirmation.customId === "create_tourney") {
        await confirmation.update({
          content: `Creating tournament...`,
          components: [],
          embeds: [],
          ephemeral: true,
        });

        await creatTournamentChannels(interaction.client).then(
          async (response) =>
            await interaction.editReply({
              content: `I've successfully created: **New Tournament**\nTo customize further and open registration, head to: <#${response.id}>`,
              components: [],
              embeds: [],
              ephemeral: true,
            })
        );
      } else if (confirmation.customId === "delete_tournament") {
      } else if (confirmation.customId === "cancel_tournament") {
        await interaction.deleteReply();
      }
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content: `Something is wrong. Please try again.\nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
        embeds: [],
      });
    }
  },
};

// Extended Functionality
// ----------------------------------------------------------------------

async function creatTournamentChannels(client) {
  const guild = await client.guilds.cache.get(config.guildId);

  try {
    const category = await guild.channels.create({
      name: `New Tournament`,
      type: ChannelType.GuildCategory,
    });

    const newAdminChannel = await guild.channels.create({
      name: `Admin`,
      type: ChannelType.GuildText,
      parent: category.id,
    });

    await guild.channels.create({
      name: `Tournament Lobby`,
      type: ChannelType.GuildVoice,
      parent: category.id,
      permissionOverwrites: [
        {
          id: config.guildId,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: config.guildId,
          allow: [PermissionsBitField.Flags.Connect],
        },
        {
          id: config.guildId,
          allow: [PermissionsBitField.Flags.Speak],
        },
      ],
    });

    await newAdminChannel.send(await AdminControlsMessage({ isEphemeral: false }));

    return newAdminChannel;
  } catch (error) {
    console.log(error);
  }
}

async function CreateControlsMessage({ isEphemeral = false }) {
  const row = new ActionRowBuilder().addComponents(
    create(),
    editDetails(),
    publish(),
    unpublish(true),
    cancel()
  );

  return {
    embeds: [createEmbed],
    components: [row],
    ephemeral: isEphemeral,
  };
}

async function AdminControlsMessage({ isEphemeral = false }) {
  const row1 = new ActionRowBuilder().addComponents(
    start(),
    startCheckin(true),
    publish(),
    unpublish(true)
  );
  const row2 = new ActionRowBuilder().addComponents(editDetails(), deleteTournament());
  return {
    embeds: [adminEmbed],
    components: [row1, row2],
    ephemeral: isEphemeral,
  };
}
