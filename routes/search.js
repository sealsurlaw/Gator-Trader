var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/',function(req,res,next){
  res.render('searchPage',{title:'SEARCH PAGE',stylesheet:'searchPage'});
});

module.exports = router;