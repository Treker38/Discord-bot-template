//test command
const mongo = require('../../handlers/mongo.js')
const testSchema = require('../../handlers/schemas/testSchema')
//Import mongo and the mongoDB Schema for the test command.

module.exports = {
    name: 'testWriteToMongoDB',
    commands: ['testWrite', 'tw'],
    expectedArgs: '[testMessage]',
    commandDescription: 'test write to the mongoDB',
    permissionError: 'You need admin permissions to run this command',
    permissions: 'ADMINISTRATOR',
    minArgs: 1,
    maxArgs: 1,
    callback: async(message, arguments, text) => {
    
        testMessage = arguments[0]

        await mongo().then(async (mongoose) =>{
// Open a mongoDB connection.
            try{
                console.log('mongoose connection opened!')

                await testSchema.findOneAndUpdate( {
                    _id: message.guild.id
// Then find a document within our mongoDB Colection with the current guild id.
// If the id doesnt exist then create a new document with the current guild id.
                }, {
                    _id: message.guild.id,
                    text: testMessage,
// Update or add the given infomation.
                }, {
                    upsert: true
// If true, Overights already existing information.
// Such as 'text' and '_id'
                })
            }finally{
                mongoose.connection.close()
                console.log('mongoose connection closed!')
// Finally close the mongoDB connection.
            }
        })
    },
}