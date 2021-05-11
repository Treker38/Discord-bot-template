const mongoose = require('mongoose')
//Import mongoose

const testSchema = mongoose.Schema({
// Create the structure of the test document.
    _id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
})  

module.exports = mongoose.model('testWrite', testSchema)
// Export the Schema as a mongoose model.