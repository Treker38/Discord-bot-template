const prefixSchema = require('../../handlers/schemas/prefixSchema')
const commandBase = require('../../handlers/command-base')
const { defaultPrefix } = require('../../config.json')
const mongo = require('../../handlers/mongo')
//Import mongo, prefixSchema, the default prefix and commandBase to get access to the update prefix cache function.

module.exports = {
    name: 'restorePrefix',
    commands: ['restorePrefix', 'rp', 'restoreP', 'rPrefix'],
    commandDescription:  'Restores bot\'s prefix to the default prefix "kyle$".',
    permissionError: 'You need admin permissions to run this command',
    permissions: 'ADMINISTRATOR',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {

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
                    prefix: defaultPrefix 
// Restore the prefix.                   
                },{
                    upsert: true
// If true, Overights already existing information.
// Such as 'prefix' and '_id'                    
                })

                message.channel.send(`Prefix has been restored to default! Aka:"${defaultPrefix}"!`)
// Send a message back to the current channel that the prefix has been restored.
                console.log(`Prefix has been restored to default! in guild "${message.guild.id}"!`) ;
// Console log the same information.                  
                commandBase.updateCache(message.guild.id, defaultPrefix)
// Update the prefix cache.
            }finally{
                mongoose.connection.close()
                console.log('mongoose connection closed!')
// Finally close the mongoDB connection.
            }
        })
    }
}