const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const fileController = require('../controllers/fileController');
// const multiparty = require('connect-multiparty')();
// const fs = require('fs');
// const Gridfs = require('gridfs-stream');

router.get('/',(req,res) => {
    // let sess = req.session

    // if(sess.user.data.email){
    //     return res.redirect('/homePage') 
    // }

    if(req.session.user){
        res.redirect('/homePage')
    } else res.render('index')
})

router.post('/login', userController.login, (req, res) => {
   
    if(res.user){
        req.session.user = res.user
        res.sendStatus(200)
    }
    else res.send(403)
     
})

router.post('/logout', (req, res) => {

    req.session.destroy((err) => {
        if(err) {
            return console.log(err)
        }
        res.redirect('/')
    })
     
})

// router.post('/nav', (req, res) => {
    
// })

router.post('/signUp', userController.signup, (req, res) => {
   
    // if(!res.user.isAxiosError){
    //     req.session.user = res.user
    //     res.sendStatus(200)
    // }
    // else res.send(403)
     
})

router.get('/homePage', userController.allowIfLoggedin, (req,res) => {
    // if(typeof req.session.user !== 'undefined'){
        if (req.session.user){
            var thisUser = req.session.user
            res.render('homePage', {thisUser: thisUser})
        }
        // else res.redirect('/')
    // }else{
        // res.redirect('/')
    // }
    
})

router.get('/manageInput', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), (req,res) => {
    // if(typeof req.session.user !== 'undefined'){
        if (req.session.user){
            var thisUser = req.session.user
            // if (adminOrSuperOnly(thisUser.role)) 
            res.render('manageInput', {thisUser : thisUser})
            // else res.redirect('/')
        }
        // else res.redirect('/')
    // }else{
        // res.redirect('/')
    // }
    
})

router.get('/userProfile', userController.allowIfLoggedin, (req,res) => {
    // if(typeof req.session.user !== 'undefined'){
        if (req.session.user){
            var thisUser = req.session.user
            res.render('userProfile', {thisUser : thisUser})
        }
        // else res.redirect('/')
    // }else{
        // res.redirect('/')
    // }
    
})


router.get('/upload', userController.allowIfLoggedin, (req,res) => {
    // if(typeof req.session.user !== 'undefined'){
        if (req.session.user){
            var thisUser = req.session.user
            res.render('upload' , {thisUser : thisUser})
        }
        // else res.redirect('/')
    // }else{
        // res.redirect('/')
    // }
    
})

router.get('/approveUsers', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers, (req,res) => {
    // if(typeof req.session.user !== 'undefined'){
        if (req.session.user){
            var thisUser = req.session.user
            // if (adminOrSuperOnly(thisUser.role)){
                var users = res.users;

                res.render('approveUsers', {users: users.filter(isPending), thisUser : thisUser})

            // }
            // else res.redirect('/')
        }
        // else res.redirect('/')
    // }else{
        // res.redirect('/')
    // }
    
})

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers, (req,res) => {
    // if(typeof req.session.user !== 'undefined'){
        if (req.session.user){
            // if (adminOrSuperOnly(req.session.user.data.role)){
                var users = res.users;
                var thisUser = req.session.user
                 res.render('users', {users: users.filter(notPending), thisUser: thisUser})
                 
            // }
            // else res.redirect('/')
        }
        // else res.redirect('/')
    // }else{
        // res.redirect('/')
    // }
    
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

    // res.send(200)
     
})

router.post('/approve', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.approveUser, (req, res) => {
    // res.redirect('approveUsers')
     
})

router.post('/deny', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.deleteUser, (req,res) => {

    // res.redirect('approveUsers')
     
})

function notPending(user) {
    return user.role != "pending";
}
function isPending(user) {
    return user.role == "pending";
}



module.exports = router