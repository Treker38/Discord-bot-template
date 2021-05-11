const Discord = require('discord.js')
// Import Discord.js
const client = new Discord.Client()
// Create a new discord client.

const { token, version } = require('./config.json');
// Import Bot token and Bot version from the config file.
const loadCommands = require('./handlers/load-commands.js')
// Import the loadCommands handler as a function.
const commandBase = require('./handlers/command-base.js')
// Import the commandBase handler as a function.

client.on('ready', async () => {
// listen for bot start up

    console.log(client.user.tag, "online");
    console.log(`client version ${version}`)
// Console log that the Bot is online.

    commandBase.loadPrefixes(client)
// Calls the loadPrefixes function that loads all guild Prefixes that the Bot is in.
    loadCommands(client)
// Calls the load commands function that loads all commands.
})

client.login(token)
// logs the bot in to discord.
// This is where the bot token is passed in.
