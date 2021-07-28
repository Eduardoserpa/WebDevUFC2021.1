const express = require('express')
const router = express.Router()

router.get('/myProfile', function(req, res, next) {
  res.locals.query = req.query;
  res.render('myProfile');
})

module.exports = router