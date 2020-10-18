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

router.get('/homePage',(req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email)res.render('homePage')
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

router.get('/users',(req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email)res.render('users')
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

router.get('/nav',(req,res) => {
    if(typeof req.session.user !== 'undefined'){
        if (req.session.user.data.email)res.render('nav')
        else res.redirect('/')
    }else{
        res.redirect('/')
    }
    
})

module.exports = router
