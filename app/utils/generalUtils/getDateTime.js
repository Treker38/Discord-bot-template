//Function that gets the current time when ran.
module.exports = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today
}

//Example
/**
 * Const getDateTime = require('../getDateTime.js')
 * 
 * if(somthing happens){
 *  console.log(getDateTime())
 * }
 * 
 */

//Console log:
// DateTime: 2021-05-10T18:18:51.606Z
//