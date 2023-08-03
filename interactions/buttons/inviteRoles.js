module.exports = {
  id: 'invite_roles',
  async execute(interaction) {
    await require('../../select-menus/InviteRolesSelect').execute(interaction);
    return;
  },
};
