const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const NotificationSchema = new Schema({
    notificationType: String,
    user: String,
    role: {
        type: String,
        enum: ["pending","basic", "admin", "superuser"]
    },
    name: String
    
})
 

const Notification = mongoose.model('notification', NotificationSchema)

module.exports = Notification

