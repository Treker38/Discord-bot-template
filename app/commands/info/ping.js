module.exports = {
    name: 'Ping',
    commands: ['ping'],
    expectedArgs: '',
    commandDescription: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async(message, arguments, text) => {
        message.channel.send(`PONG! | Latency is: **${Date.now() - message.createdTimestamp}ms.**`)
// Send the Bot's current latency.
    },
}