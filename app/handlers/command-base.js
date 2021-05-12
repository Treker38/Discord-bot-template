const mongo = require('../handlers/mongo')
const getDateTime = require('../utils/generalUtils/getDateTime')
const prefixSchema = require('./schemas/prefixSchema')
const { defaultPrefix } = require('../config.json')
//Import mongo, the getDateTime function, prefixSchema and default prefix.

// Make a empty guildPrefix object.
const guildPrefixes = {}


// Create the validatePermissions function that is used to check if a given command permissions are real discord permissions.
const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]
  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}


//Make a empty allCommands object.
const allCommands = {}

module.exports = (commandOptions) => {

// load commandOptions into a command object and permissions object.
var {
    commands,
    permissions = [],
  } = commandOptions

// Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  }

// Console log all commands on start up
  console.log(`Registering command "${commands[0]}"`)


// Ensure all aliases are converted to lowercase.
  for (var i = 0; i < commandOptions.commands.length; i++) {
    sorted = []
    sorted.push(commandOptions.commands[i].toLowerCase())
    
    commands = sorted
  }

// Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }


    validatePermissions(permissions)
// Run the validatePermissions function.
  }

// Load commandOptions, commands and permissions into allCommands object.
  for (const command of commands){
    allCommands[command] = {
      ...commandOptions,
      commands,
      permissions,
    }
  }
}

// Updates prefix cache when called.
module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix
}

// Loads all guild prefixes on start up.
module.exports.loadPrefixes = async (client) =>{
  await mongo().then(async mongoose =>{
    try{
      console.log('\nmongoose connection opened!')
      console.log('...reading guild Info!')
      for(const guild of client.guilds.cache){
        const guildId = guild[1].id
        const result = await prefixSchema.findOne({_id: guildId})
        guildPrefixes[guildId] = result ? result.prefix : defaultPrefix
      }   
      console.log(`...found all guildPrefixes \n--> [`)
      console.log(guildPrefixes)
      console.log('   ] <--')
    }finally{
      mongoose.connection.close()
      console.log(`mongoose connection closed! \n \n${client.user.tag} is running well! \n...now listening for commands! \n`)
    }
  })
}

// Lstens for discord messages.
module.exports.listen = (client) => {
  client.on('message', (message) => {

// Stop dms from crashing bot.
     if(message.guild === null) return

// Grab member, content, and guild vars from the message object to make code cleaner.
      var { member, content, guild } = message

// Asign current guild prefix to the prefix const.
      const prefix = guildPrefixes[guild.id] || defaultPrefix

// Split the arguments.
      const arguments = content.split(/[ ]+/)

// Grab the command name.
      const alias = arguments.shift().toLowerCase()

      if(alias.startsWith(prefix)){
        const command = allCommands[alias.replace(prefix, '')]
// Check if given command is a real command.
        if(!command) return
// If not return

// Asign commandOptions into there own vars.  
        const { 
                commands,
                name,
                permissions, 
                permissionError = "You do not have the required permissions to run this command. :(",
                commandDescription = '',
                extraInfo = '',
                commandHelp = '',
                requiredRoles = [],
                minArgs = 0,
                maxArgs = null,
                expectedArgs,
                callback,
              } = command

// Ensure the current user has the vaild permissions to run the given command.
          for (const permission of permissions) {
            if (!member.hasPermission(permission)) {
              message.reply(permissionError)
              return
            }
          }

// Ensure the current user has the vaild roles to run the given command.
          for (const requiredRole of requiredRoles) {
            const role = guild.roles.cache.find(
              (role) => role.name === requiredRole
            )
            if (!role || !member.roles.cache.has(role.id)) {
              message.reply(
                `You must have the "${requiredRole}" role to use this command.`
              )
              return
            }
          }

// Check to see if the right amount of arguments where given.
          if (
            arguments.length < minArgs ||
            (maxArgs !== null && arguments.length > maxArgs)
          ) {
            message.reply(
              `Incorrect syntax! Use ${alias} ${expectedArgs}`
            )
            return
          }

// Console log all command, user and guild info.
          console.log(`\nThe command --> ("${alias}" with args:"${arguments}" with permissions:"${permissions}") \nRequested by user --> ("${message.author.username}", userId:${message.author.id})\nIn the channel --> ("${message.channel.name}", channelId:${message.channel.id})\nIn the guild --> ("${message.guild}", guildId:${message.guild.id})\nDateTime: ${getDateTime().toISOString()}\nCommand output:`)

// Excute the custom command code.
          callback(message, arguments, arguments.join(' '), client)


        }
    })
}