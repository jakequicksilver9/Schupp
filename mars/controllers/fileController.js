const File = require('../classes/file')

exports.upload = async (req, res, next) => {
    try {
        const { file, name } = req.body
        const userId = req.params.userId
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