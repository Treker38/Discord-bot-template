module.exports = {
    name: 'Ping',
    commands: ['ping'],
    expectedArgs: '',
    commandDescription: 'Is used to get bot responce time.',
    minArgs: 0,
    maxArgs: 0,
    callback: async(message, arguments, text) => {
// Sends the Bot and API's current latency.
        ping = Date.now() - message.createdTimestamp
        message.channel.send(`PONG! | Bot latency: ${ping}ms!, API Latency: ${client.ws.ping}ms!`)
    },
}