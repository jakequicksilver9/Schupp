const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const fileController = require('../controllers/fileController');
const errors = require('../classes/errors')


router.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/homePage')
    } else res.render('index')
})

router.post('/login', userController.login,  (req, res) => {
    if (res.error == errors.roleError) res.status(200).send(errors.roleError.message)
    else{
        if(res.user){
            req.session.user = res.user
            res.sendStatus(200)
        }
        else res.send(403)
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err)
        }
        res.redirect('/')
    })
})

router.post('/signUp', userController.signup, (req, res) => {
})

router.get('/pendingUser', (req,res) => {
    res.render('pendingUserPage')
})

router.get('/homePage', userController.allowIfLoggedin, (req,res) => {
    if (req.session.user){
        var thisUser = req.session.user
        res.render('homePage', {thisUser: thisUser})
    }
})

router.get('/manageInput', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), (req,res) => {
    if (req.session.user){
        var thisUser = req.session.user
        res.render('manageInput', {thisUser : thisUser})
    }
})

router.get('/userProfile', userController.allowIfLoggedin, (req,res) => {
    if (req.session.user){
        var thisUser = req.session.user
        res.render('userProfile', {thisUser : thisUser})
    }
})


router.get('/upload', userController.allowIfLoggedin, (req,res) => {
    if (req.session.user){
        var thisUser = req.session.user
        res.render('upload' , {thisUser : thisUser})
    }
})

router.get('/approveUsers', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers, (req,res) => {
    if (req.session.user){
        var thisUser = req.session.user
        var users = res.users;
        res.render('approveUsers', {users: users.filter(isPending), thisUser : thisUser})
    }
})

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers, (req,res) => {
    if (req.session.user){
        var users = res.users;
        var thisUser = req.session.user
        res.render('users', {users: users.filter(notPending), thisUser: thisUser})
    }
})

router.post('/upload', userController.allowIfLoggedin, fileController.upload, (req, res) => {
})

router.get('/files', userController.allowIfLoggedin, fileController.getFiles, (req, res) => {
    if (req.session.user){
        var files = res.files
        var thisUser = req.session.user
        res.render('files', {files: files, thisUser: thisUser})
    }
})

router.post('/deleteFile', userController.allowIfLoggedin, fileController.deleteFile, (req,res) => {
})

router.post('/approve', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.approveUser, (req, res) => {
})

router.post('/deny', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.deleteUser, (req,res) => {
})

function notPending(user) {
    return user.role != "pending";
}
function isPending(user) {
    return user.role == "pending";
}

module.exports = router