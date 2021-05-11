const prefixSchema = require('../../handlers/schemas/prefixSchema')
const commandBase = require('../../handlers/command-base')
const mongo = require('../../handlers/mongo')
//Import mongo, our prefixSchema and commandBase to get access to the update prefix cache function.

module.exports = {
    name: 'changePrefix',
    commands: ['changePrefix', 'cp', 'changeP', 'cPrefix'],
    expectedArgs: '[newPrefix]',
    commandDescription: 'Changes bots prefix.',
    extraInfo: 'It is not recommended to change prefix to "#" "@" "/".',
    permissionError: 'You need admin permissions to run this command',
    permissions: 'ADMINISTRATOR',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {

        const newPrefix = arguments[0]

        await mongo().then(async (mongoose)=>{
// Open a mongoDB connection.
            try{
                console.log('mongoose connection opened!')
                console.log('...reading prefix Info!')
// Console log progress.

                await prefixSchema.findOneAndUpdate({
// Then find a document within our mongoDB Colection with the current guild id.
// If the id doesnt exist then create a new document with the current guild id.
                    _id: message.guild.id
                },{
                    _id: message.guild.id,
                    prefix: newPrefix
// Update the prefix.        
                },{
                    upsert: true
// If true, Overights already existing information.
// Such as 'prefix' and '_id'
                })
                message.channel.send(`Prefix has been updated to "${newPrefix}"!`)
// Send a message back to the current channel that the prefix has been updated.
                console.log(`Prefix has been updated to "${newPrefix}" in guild "${message.guild.id}"!`) 
// Console log the same information.
                commandBase.updateCache(message.guild.id, newPrefix)
// Update the prefix cache.
            }finally{
                mongoose.connection.close()
                console.log('mongoose connection closed!')
// Finally close the mongoDB connection.
            }
        })
    } 
}