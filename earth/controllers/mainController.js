const express = require('express')
const router = express.Router()
const dbController = require('./dbController')

router.get('/',(req,res) => {
    let sess = req.session

    // if(sess.user.data.email){
    //     return res.redirect('/homePage') 
    // }

    if(typeof sess.user !== 'undefined'){
        if (sess.user.data.email) res.redirect('/homePage')
    }

    res.render('index')
})

router.post('/login', dbController.login, (req, res) => {
   
    if(!res.user.isAxiosError){
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

router.post('/nav', (req, res) => {
    
})

router.post('/signUp', dbController.signUp, (req, res) => {
   
    if(!res.user.isAxiosError){
        req.session.user = res.user
        res.sendStatus(200)
    }
    else res.send(403)
     
})

router.get('/homePage',(req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email){
            res.render('homePage')
        }
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

router.get('/manageInput',(req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email){
            if (adminOrSuperOnly(req.session.user.data.role)) res.render('manageInput')
            else res.redirect('/')
        }
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

router.get('/userProfile',(req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email){
            res.render('userProfile')
        }
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

router.get('/approveUsers', dbController.users, (req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email){
            if (adminOrSuperOnly(req.session.user.data.role)){
                var users = res.users.data;
                res.render('approveUsers', {users: users.filter(isPending)})
            }
            else res.redirect('/')
        }
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

router.get('/users', dbController.users, (req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email){
            if (adminOrSuperOnly(req.session.user.data.role)){
                var users = res.users.data;
                 res.render('users', {users: users.filter(notPending)})
            }
            else res.redirect('/')
        }
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

function adminOrSuperOnly(role){
    if (role == "admin" || role == "superuser") return true
    else return false
}

function notPending(user) {
    return user.role != "pending";
}
function isPending(user) {
    return user.role == "pending";
}



module.exports = router