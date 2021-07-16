const express = require('express')
const router = express.Router()

router.get('/addSale', function(req, res, next) {
  res.render('sale/addSale')
})

module.exports = router