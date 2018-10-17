var express = require("express");
var router = express.Router();
var pgp = require('pg-promise');
var db = require('../db');




router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db.any(`SELECT * FROM "Items"`)
    .then(function(myData) {
      console.log(myData);
      res.render('vertical', { data: myData });
    })
    .catch(function(error) {
        console.log(error);
    });
});
module.exports = router;
