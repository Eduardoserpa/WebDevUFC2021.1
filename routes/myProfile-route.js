const express = require('express')
const router = express.Router()

router.get('/myProfile', function(req, res, next) {
  res.render('myProfile')
})

module.exports = router