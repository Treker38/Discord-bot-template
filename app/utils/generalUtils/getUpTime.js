//Function that gets the current Bots uptime when ran.
module.exports = (client) => {
    var totalSeconds = (client.uptime / 1000);
    var days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);

    if(minutes === 0){
        var upTime = `${seconds} seconds`
    }else if(hours === 0){
        var upTime = `${minutes} minutes and ${seconds} seconds`
    }else if(days === 0){
        var upTime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`
    }else if(days => 1){
        var upTime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    }
    return upTime
}

//Example
/**
 * Const getDateTime = require('../getUpTime.js')
 * 
 * if(somthing happens){
 *  console.log(getUpTime())
 * }
 * 
 */

// If the bot has been online for 57 secounds it'll output:
//
//Console log:
// 57 secounds
//