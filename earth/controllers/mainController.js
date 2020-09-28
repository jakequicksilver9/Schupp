const express = require('express')
const router = express.Router()
const dbController = require('./dbController')

router.get('/',(req,res) => {
    let sess = req.session

    // if(sess.user.data.email){
    //     return res.redirect('/homePage') 
    // }
    res.render('index')
})

router.post('/login', dbController.login, (req, res) => {
   
    if(!res.user.isAxiosError){
        req.session.user = res.user
        return res.redirect('/homePage') 
    }
    else return null
     
})

router.get('/homePage',(req,res) => {
    
    res.render('homePage')

})

module.exports = router
