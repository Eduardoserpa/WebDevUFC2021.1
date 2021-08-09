const express = require('express')
const router = express.Router()

router.get('/editUser', function(req, res, next) {
  const user = req.cookies.user;  

  if(user===''){
    res.redirect('/');
    }
  else{
      res.render('user/editUser', {user})
    }
})

module.exports = router