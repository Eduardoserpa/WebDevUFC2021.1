const express = require('express')
const router = express.Router()

router.get('/addUser', function(req, res, next) {
  res.render('user/addUser')
})

module.exports = router