const mongoose = require('mongoose')
//Import mongoose

const prefixSchema = mongoose.Schema({
// Create the structure of the prefix document.
    _id: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('guild-Prefixes', prefixSchema)
// Export the Schema as a mongoose model.