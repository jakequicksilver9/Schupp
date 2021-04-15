const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const FileSchema = new Schema({
    file: {
    type: String,
    required: true,
    },
    userId: {
    type: String,
    required: true
    },
    name: {
        type: String,
        required: true
        },
    date: {
        type: String
    },
    type: {
        type: String
    },
    officeName: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    }
})
 
const File = mongoose.model('file', FileSchema)

module.exports = File

