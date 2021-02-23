const Notification = require('../classes/notification')
// const { roles } = require('../classes/roles')

 
exports.newUserNotification = async (req, res, next, user) => {
    try {
        const { name} = req.body
        var user = user.toString()
        const newNotification = new Notification({name, user})
        await newNotification.save()
        next()
    } catch (error) {
        next(error)
    }
}

exports.getUserNotification = async (req, res, next) => {
    try {
        const notifications = await Notification.find({})
        res.notifications = notifications
        next()
    } catch (error) {
        next(error)
    }
}

exports.deleteNotification = async (req, res, next, user) => {
    try{
        Notification.findOneAndDelete({user})
    }catch (error){
        next(error)
    }
}