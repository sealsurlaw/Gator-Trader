var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    db.any(`SELECT * FROM item WHERE user_id =` + req.session.user_id )
    .then( data => db.any(`SELECT * from category`)
    .then( cats => {
      data.forEach(item => {
        cats.forEach(cat => {
          if (item.category_id == cat.category_id) {
            item.item_category = cat.category_name;
          }
        });
      });
      render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {data: data, script: 'tabSwitcher'});
    }));
  }
  else {
    req.session.nextPage = '/dashboard';
    res.redirect('/login');
  }

});

module.exports = router;
