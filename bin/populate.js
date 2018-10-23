var express = require("express");
var fs = require('fs');
var router = express.Router();
var db = require('../db');

var createTables = fs.readFileSync('dbSetup.txt').toString();
createTables += fs.readFileSync('dbData.txt').toString();

db.any(createTables)
   .then(function(myData) {
      console.log("Tables populated");   
      process.exit();
   })
   .catch(function(error) {
      console.log(error);
      process.exit();
   });
