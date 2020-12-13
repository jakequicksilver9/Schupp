const File = require('../classes/file')

exports.upload = async (req, res, next) => {
    try {
        const { file, name } = req.body
        const userId = req.session.user.id
        // const user = await User.findById(userId)
        
        const fileUpload = new File({ file: file, userId: userId, name: name})
        
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
        res.files = files
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