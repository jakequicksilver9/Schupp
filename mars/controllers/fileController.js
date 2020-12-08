const File = require('../classes/file')

exports.upload = async (req, res, next) => {
    try {
        const { file, name } = req.body
        const userId = req.params.fileId
        // const user = await User.findById(userId)
        
        const fileUpload = new File({ file: file, userId: userId, name: name})
        
        await fileUpload.save()
        res.status(200).json({
            data: { message: "done" }
            })
            


    } catch (error) {
        next(error)
    }
}

exports.getFiles = async (req, res, next) => {
    try {
        const files = await File.find({})
        res.status(200).json({
        data: files
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteFile = async (req, res, next) => {
    try {
        const fileId = req.params.fileId
        await File.findByIdAndDelete(fileId)
        res.status(200).json({
        data: null,
        message: 'File has been deleted'
        })
    } catch (error) {
        next(error)
    }
}