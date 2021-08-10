const express = require('express')
const router = express.Router()

router.get('/addProduct', function(req, res, next) {
  res.locals.query = req.query;
  const id = req.query;
  sessionStorage.setItem('td',req.query);
  res.render('product/addProduct', { id });
});

module.exports = router