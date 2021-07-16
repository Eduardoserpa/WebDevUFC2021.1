const express = require('express')
const router = express.Router()

router.get('/editProduct', function(req, res, next) {
  res.render('product/editProduct')
})

module.exports = router