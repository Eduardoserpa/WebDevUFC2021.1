const express = require('express')
const router = express.Router()

router.get('/login', function(req, res, next) {
  const user = req.cookies.user;  
  if(user===''){
    res.render('login',{});
  }
  else{
    res.redirect('/myProfile');
  }
})

module.exports = router