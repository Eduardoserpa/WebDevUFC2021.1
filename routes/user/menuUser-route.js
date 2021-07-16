const express = require('express')
const router = express.Router()

router.get('/menuUser', function(req, res, next) {
  res.render('user/menuUser')
})

module.exports = router