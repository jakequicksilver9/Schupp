const Notification = require('../classes/notification')
// const { roles } = require('../classes/roles')

 
exports.newUserNotification = async (req, res, next, id) => {
    try {
        const { name} = req.body
        const newNotification = new Notification({name: name, user: id})
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