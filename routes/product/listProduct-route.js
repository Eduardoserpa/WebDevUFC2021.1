const express = require('express')
const router = express.Router()

router.get('/listProduct', function(req, res, next) {
  res.render('product/listProduct')
})

module.exports = router