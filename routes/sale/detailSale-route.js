const express = require('express')
const router = express.Router()

router.get('/detailSale', function(req, res, next) {
  res.render('sale/detailSale')
})

module.exports = router