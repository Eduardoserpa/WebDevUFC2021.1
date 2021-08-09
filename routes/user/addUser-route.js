const express = require('express')
const router = express.Router()

router.get('/addUser', function(req, res, next) {
  const user = req.cookies.user;  
  res.render('user/addUser', {user})
})

module.exports = router