const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const NotificationSchema = new Schema({
    notificationType: {
    type: String,
    },
    user: {
    type: String,
    },
    role: {
    type: String,
    enum: ["pending","basic", "admin", "superuser"]
    },
    name: {
        type: String
    }
})
 

const Notification = mongoose.model('notification', NotificationSchema)

module.exports = Notification

