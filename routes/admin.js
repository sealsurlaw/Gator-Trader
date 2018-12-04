var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/', function(req, res, next){
  if (!req.session.user_id){
    req.session.nextPage = '/admin';
    res.redirect('/login');
    return;
  }

  db.any(`SELECT * FROM item`)
  .then( data => db.any('SELECT * category')
  .then (cats => {
    var items = data;
    data = {};
    data.items = items;

    data.items.forEach(item => {
      cats.forEach(cat =>{
        if (item.category_id == cat.category_id){
          item.item_category = cat.category_name;
        }
      });
    });

    db.any(`SELECT * FROM item WHERE item_status= 'Pending'` )
    .then(items => db.any(`SELECT * FROM users`))

    
  })

}
)
