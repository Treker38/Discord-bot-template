## By Macen
Discord bot template with an advanced command handler and Per-guild prefix handling, By: Macen.

## Creating a Discord Bot
Visit Discord's Developer Portal: https://discordapp.com/developers/applications/ Click "New Application", Enter in your application's name, Click on "Bot" in the settings tab on the side bar, Then click "add bot", yes do it!

This is where you can obtain your discord Bot token, as well as give your Bot a name and pfp!

## Per-guild prefixes using mongoDB
Getting started with mongoDB

Great resource on getting up to speed on mongoDB by Worn Off Keys, as well as how to setup and get your mongoDB path:

Playlist:

- https://www.youtube.com/watch?v=358kUe0CKiE&list=PLaxxQQak6D_dHXuCYHwgyHwhs225vUX6d&index=2

Worn Off Keys Channel: 

- https://www.youtube.com/channel/UChPrh75CmPP9Ig6jISPnfNA

MongoDB:
- https://www.mongodb.com/
- https://docs.mongodb.com/

## Getting started
1. Make a copy/clone this repo.
2. Add mongoDB path and Discord Bot token to config.json
3. Run Bot with "npm run start"

Finally! Edit and add to your heart's desire!

## Example of a basic command
Example of the test helloWorld command.
```js
//Exports the command as a function to be read by the load-Commands.js file on bot start up.
module.exports = {
    //CommandOptions
    name: 'HelloWorld', // Command name
    commands: ['helloWorld', 'hw', 'test'], // Command aliases.
    expectedArgs: '', // Expected Arguments error message.
    commandDescription: '', // Command description.
    commandHelp: '', // Command help info.
    extraInfo:'', // Extra info.
    permissionError:'', // Permissions error message.
    permissions:'', // Permissions required to run the command.
    requiredRoles: [], // Required roles required to run the command.
    minArgs: 0, // Minimum arguments required to run the command.
    maxArgs: 1, // Maximum amount of arguments required to run the command.
    //Name: '', Commands: [''] are required.
    
    callback: (message, arguments, text, client) => {
    //' callback: () =>{}' Executes the custom command code.
    // '(message, arguments, text, client)' Passes through 'message', 'arguments', 'text', 'client'.
    // Must be in that order to properly pass through.
    
    // Text is all arguments joined.
    // Used to input more than 1 word in an argument.
    // Set maxArgs to 100 to use text.
    // You can also recreate this with just 

    //```js

    //arguments.join(" ")

    //```
        const input = arguments[0]
    // Assign the first argument to the const 'input'.

        if(!input){
    // Check to see if an argument was provided.
    // If not then execute 'message.channel.send('Hello!')'.
          return message.channel.send('Hello!')
    // Sends 'hello' back to the channel that the command was executed in.
    // Then exits the command with return 
    // Stopping the rest of the code from executing when we don't want it to.
        }
    // Else if an argument was provided.
        message.channel.send(input)
    // Send the provided argument back.
    }
}
```

## Great resources

Worn Off Keys on youTube
- https://www.youtube.com/channel/UChPrh75CmPP9Ig6jISPnfNA

Discord.js Api documentation
- https://discord.js.org/#/
- https://discord.com/developers/docs/intro

MongoDB documentation
- https://docs.mongodb.com/
