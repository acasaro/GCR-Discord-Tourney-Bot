const fs = require('fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { config } = require('./config');
const { token } = config;
const { DataTypes } = require('sequelize');

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection of Commands, Slash Commands and cooldowns
// ----------------------------------------------------------------------
bot.commands = new Collection();
bot.buttonCommands = new Collection();
bot.modalCommands = new Collection();
bot.selectCommands = new Collection();

// Registration of Slash-Command Interactions
// ----------------------------------------------------------------------
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs
  .readdirSync(foldersPath)
  .filter(folder => folder !== '.DS_Store');

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const subDirectories = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));
  for (const file of subDirectories) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      bot.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

// Initialize Event Handler
// ----------------------------------------------------------------------
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args));
  } else {
    bot.on(event.name, (...args) => event.execute(...args));
  }
}

// Register Button-Command Interactions
// ----------------------------------------------------------------------
const buttonCommands = fs.readdirSync('./interactions/buttons');

for (const module of buttonCommands) {
  const command = require(`./interactions/buttons/${module}`);
  bot.buttonCommands.set(command.id, command);
  console.log(`${command.id} Button command successfully loaded...`);
}

// Registration of Modal-Command Interactions.
// ----------------------------------------------------------------------
const modalCommands = fs.readdirSync('./interactions/modals');

for (const module of modalCommands) {
  const command = require(`./interactions/modals/${module}`);
  bot.modalCommands.set(command.id, command);
  console.log(`${command.id} Modal command successfully loaded...`);
}

// Registration of select-menus Interactions
// ----------------------------------------------------------------------
const selectMenus = fs.readdirSync('./interactions/select-menus');

// Loop through all files and store select-menus in selectMenus collection.

for (const module of selectMenus) {
  const command = require(`./interactions/select-menus/${module}`);
  bot.selectCommands.set(command.id, command);
  console.log(`${command.id} Select menu successfully loaded...`);
}

bot.login(token);
