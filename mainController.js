const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    let sess = req.session
    if(sess.user) {
        return res.redirect('/admin')
    }
    res.render('index')
})

module.exports = router
