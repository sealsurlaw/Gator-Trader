var express = require("express");
var fs = require('fs');
var router = express.Router();
var db = require('../db');

var createTables = fs.readFileSync('dbSetup.txt').toString();
createTables += fs.readFileSync('dbData.txt').toString();

router.get('/', function(req, res, next) {
    db.any(createTables)
      .then(function(myData) {
        res.render('populate');
      })
      .catch(function(error) {
          console.log(error);n
      });
});
module.exports = router;
