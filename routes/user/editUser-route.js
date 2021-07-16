const express = require('express')
const router = express.Router()

router.get('/editUser', function(req, res, next) {
  res.render('user/editUser')
})

module.exports = router