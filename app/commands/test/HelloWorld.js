//test command

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
    //' callback: () =>{}' Excutes the custom command code.
    // '(message, arguments, text, client)' Passes through 'message', 'arguments', 'text', 'client'.
    // Must be in that order to properly pass through.
    
    // Text is all arguments joined.
    // Used to input more then 1 word in an argument.
    // Set maxArgs to 100 to use text.
    // You can also recreate this with just 
    //```
    //arguments.join(" ")
    //```
        const input = arguments[0]
    // Asign the first argument to the const 'input'.

        if(!input){
    // Check to see if and argument was provided.
    // If not then excute 'message.channel.send('Hello!')'.
          return message.channel.send('Hello!')
    // Sends 'hello' back to the channel that the command was executed in.
    // Then exits the command with return 
    // Stoping the rest of the code from excuting when we don't want it to.
        }
    // Else if an argument was provided.
        message.channel.send(input)
    // Send the provided argument back.
    }
}