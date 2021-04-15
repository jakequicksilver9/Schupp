const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const UserSchema = new Schema({
    email: {
    type: String,
    required: true,
    trim: true
    },
    password: {
    type: String,
    required: true
    },
    role: {
    type: String,
    default: 'basic',
    enum: ["pending","basic", "admin", "superuser"]
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    accessToken: {
    type: String
    },street: {
    type: String,
    required: false,
    },
    officeName: {
    type: String,
    required: false,
    },
    street: {
    type: String,
    required: false,
    },
    city: {
    type: String,
    required: false
    },
    state: {
        type: String,
        required: false
        },
    zip: {
        type: String,
        required: false
    },
    })
 
const User = mongoose.model('user', UserSchema)

module.exports = User

