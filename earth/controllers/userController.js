const User = require('../classes/user')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { roles } = require('../classes/roles')



 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
      if (req.session.user){
        const permission = roles.can(req.session.user.role)[action](resource)
        if (!permission.granted) {
            next(new Error("You don't have enough permission to perform this action"))
            // error: "You don't have enough permission to perform this action"
            // })
        }
        next()
      } else next()
  } catch (error) {
   next(error)
  }
 }
}
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = req.session.user
  if (!user)
  next(res.redirect('/'))
//    next(new Error("You need to be logged in to access this route"))
    // error: 
//    })
   req.user = user
   next()
  } catch (error) {
//    next(error)
    res.redirect('/')
  }
}
 
async function hashPassword(password) {
 return await bcrypt.hash(password, 10)
}
 
async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword)
}
 
exports.signup = async (req, res, next) => {
    try {
        const { email, password, role, name, phone } = req.body
        const hashedPassword = await hashPassword(password)
        const newUser = new User({ email, password: hashedPassword, role: "pending", name:name, phone:phone })
        // const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        // expiresIn: "1d"
        // })
        // newUser.accessToken = accessToken
        await newUser.save()
        res.status(200).json({
            data: { email: newUser.email, role: newUser.role }
            // accessToken
        })
    } catch (error) {
        res.status(500).json({
            data: { message: "failure" }
        })
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return next(new Error('Email does not exist'))
        const validPassword = await validatePassword(password, user.password)
        if (!validPassword) return next(new Error('Password is not correct'))
        // const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        // expiresIn: "1d"
        // })
        // await User.findById(user._id)
        if (user.role != "pending"){
            res.user = { email: user.email, role: user.role, id:user._id }
            next()
            // res.status(200).json({
            // data: { email: user.email, role: user.role, id:user._id }
            // ,accessToken
            // })
        }
        else {
            throw new Error("Invalid Role")
        }
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res, next) => {
try {
    const users = await User.find({})
    // res.status(200).json({
    // data: users
    // })
    res.users = users
    next()
} catch (error) {
    next(error)
}
}
    
exports.getUser = async (req, res, next) => {
try {
    const userId = req.params.userId
    const user = await User.findById(userId)
    if (!user) return next(new Error('User does not exist'))
    res.status(200).json({
    data: user
    })
} catch (error) {
    next(error)
}
}

exports.updateUser = async (req, res, next) => {
try {
    const update = req.body
    const userId = req.params.userId
    await User.findByIdAndUpdate(userId, update)
    const user = await User.findById(userId)
    res.status(200).json({
    data: user,
    message: 'User has been updated'
    })
} catch (error) {
    next(error)
}
}

exports.approveUser = async (req, res, next) => {
    try {
        const userId = req.body.id
        const user = await User.findById(userId)
        user.role = "basic"
        await User.findByIdAndUpdate(userId, user)
        res.status(200).json({
        data: null,
        message: 'User has been updated'
        })
    } catch (error) {
        res.status(500).json({
            data: { message: "failure" }
        })
        next(error)
    }
    }

exports.deleteUser = async (req, res, next) => {
try {
    const userId = req.body.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
    data: null,
    message: 'User has been deleted'
    })
} catch (error) {
    res.status(500).json({
        data: { message: "failure" }
    })
    next(error)
}
}


