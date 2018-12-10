/*
* The purpose of this .js is to route to the homepage.
* This is true whether the user is registered or not.
*/

var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;
var queryText = 'SELECT item_image_thumbnail FROM item WHERE category_id=1';
var tempQuery = 'SELECT item_image_thumbnail, category_id FROM item ORDER BY category_id';

router.get('/' ,function(req, res) {

  console.log("Hi");
  db.query(queryText)
  .then(data => {
    console.log(data.length);
    render(req,res,'home','HOME PAGE', 'home',{data:data});
  })
  .catch( (e) => {
      res.render('error');
  });
});
module.exports = router;
