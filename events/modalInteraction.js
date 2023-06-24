const { InteractionType } = require('discord-api-types/v10');

module.exports = {
  name: 'interactionCreate',

  /**
   * @description Executes when an interaction is created and handle it.
   */

  async execute(interaction) {
    // Deconstructed client from interaction object.
    const { client } = interaction;

    // Checks if the interaction is a modal interaction (to prevent weird bugs)

    if (!interaction.isModalSubmit()) return;

    const command = client.modalCommands.get(interaction.customId);

    // If the interaction is not a command in cache, return error message.
    // You can modify the error message at ./messages/defaultModalError.js file!

    if (!command) {
      await require('../messages/defaultModalError').execute(interaction);
      return;
    }

    // A try to execute the interaction.

    try {
      await command.execute(interaction);
      return;
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `There was an issue while understanding this modal! \nError catch: \n\`\`\` ${error}\n\`\`\``,
        ephemeral: true,
      });
      return;
    }
  },
};
