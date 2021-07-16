const express = require('express')
const router = express.Router()

router.get('/listSale', function(req, res, next) {
  res.render('sale/listSale')
})

module.exports = router