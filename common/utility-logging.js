// const chalk = async () => await import('chalk');
const chalk = require('chalk');

// COLORS
const discordBlue = chalk.hex('#717EEF');

function db(message) {
  console.log(`[${chalk.yellowBright('SQLite')}]-${message}`);
}

function info(message) {
  console.log(chalk.blue(message));
}

function success(message) {
  console.log(chalk.green(message));
}

function error(message) {
  console.log(chalk.red(message));
}

function discord(commandName, message) {
  console.log(
    `[${discordBlue('Discord')}]-${chalk.bold(
      commandName,
    )} ${message} ${chalk.greenBright('loaded...')}`,
  );
}

module.exports = {
  logdb: db,
  logInfo: info,
  logError: error,
  logDiscord: discord,
  logSuccess: success,
};
