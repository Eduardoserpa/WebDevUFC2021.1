const express = require('express')
const router = express.Router()

router.get('/editUser', function(req, res, next) {
  const user = req.cookies.user;  
    res.render('user/editUser', {user})
})

module.exports = router