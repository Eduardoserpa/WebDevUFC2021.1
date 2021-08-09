const express = require('express')
const router = express.Router()

router.get('/myProfile', function(req, res, next) {
  res.locals.query = req.query;
  const user = req.cookies.user;
  
  
  if(user===''){
    res.redirect('/');
    }
  else{
    res.render('myProfile', {user});
    }
  
})

module.exports = router