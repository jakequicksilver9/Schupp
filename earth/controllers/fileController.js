const File = require('../classes/file')

exports.upload = async (req, res, next) => {
    try {
        const { file, name } = req.body
        const userId = req.session.user.id
        const officeName = req.session.user.office
        const email = req.session.user.email
        const username = req.session.user.name
        // const user = await User.findById(userId)
        
        const fileUpload = new File({ file: file, userId: userId, name: name, officeName: officeName, email:email, username:username})
        
        await fileUpload.save()
        res.status(200).json({
            data: { message: "done" }
        })
        next()

    } catch (error) {
        res.status(500).json({
            data: { message: "failure" }
        })
        next(error)
    }
}

exports.getFiles = async (req, res, next) => {
    try {
        const files = await File.find({})
        if (req.session.user.role != 'basic'){
            res.files = files
        }else{
            var userId = req.session.user.id
            res.files = files.filter(val => val.userId == userId)
        }
        next()
    } catch (error) {
        next(error)
    }
}

exports.deleteFile = async (req, res, next) => {
    try {
        const fileId = req.body.id
        await File.findByIdAndDelete(fileId)
        res.status(200).json({
        data: null,
        message: 'File has been deleted'
        })
    } catch (error) {
        res.status(500).json({
            data: { message: "failure" }
        })
        next(error)
    }
}

