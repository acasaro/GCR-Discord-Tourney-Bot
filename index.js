const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { config } = require("./config");
const { token } = config;

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

/**********************************************************************/
// Define Collection of Commands, Slash Commands and cooldowns

bot.commands = new Collection();
bot.buttonCommands = new Collection();

/**********************************************************************/
// Registration of Slash-Command Interactions.

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath).filter((folder) => folder !== ".DS_Store");

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const subDirectories = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  for (const file of subDirectories) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      bot.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

/**********************************************************************/
// Below we will be making an event handler!

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args));
  } else {
    bot.on(event.name, (...args) => event.execute(...args));
  }
}

/**********************************************************************/
// Registration of Button-Command Interactions.

const interactionsPath = path.join(__dirname, "interactions");
const interactionFolders = fs.readdirSync(interactionsPath);

for (const folder of interactionFolders) {
  const commandsPath = path.join(interactionsPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    bot.buttonCommands.set(command.id, command);
  }
}

bot.login(token);
