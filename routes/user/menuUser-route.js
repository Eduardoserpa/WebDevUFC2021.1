const express = require('express')
const router = express.Router()


router.get('/menuUser', function(req, res, next) {
    const user = req.cookies.user;  
    res.render('user/menuUser', {user})
})

module.exports = router