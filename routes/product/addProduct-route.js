const express = require('express')
const router = express.Router()

router.get('/addProduct', function(req, res, next) {
  res.render('product/addProduct');
});

module.exports = router