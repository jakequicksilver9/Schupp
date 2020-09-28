const express = require('express')
const router = express.Router()
// const user = require("../classes/user")

router.get('/',(req,res) => {
    let sess = req.session
    // if(sess.user){
        // return res.redirect('/homePage') 
    // }
    res.render('index')
})

router.post('/',(req,res) => {
    // req.session.user = new user.User(req.body.email, req.body.pass)

    // if(req.session.user){
        return res.redirect('/homePage') 
    // }
     
})

router.get('/homePage',(req,res) => {
    
    res.render('homePage')

    // res.redirect('/homePage')


})

module.exports = router
