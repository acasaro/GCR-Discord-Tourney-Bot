const commands = {
  move: '1117595773429878806',
  reload: '1117316069099589643',
};

const channels = {
  tourney_bot_test: '1117364120543559720',
};

// NOTE: This eventually needs to be dynamic and stored to
// database using a slash command.

const tournamentRankedRoles = {
  1116124871068491826: 'Platinum',
  1116124795105447946: 'Diamond',
  1116122232465404004: 'Champion',
  1116124756694007909: 'Grand Champion',
  1116124545615679598: 'SSL',
};

module.exports = {
  commands,
  channels,
  tournamentRankedRoles,
};
