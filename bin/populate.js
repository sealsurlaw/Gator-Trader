var express = require("express");
var fs = require('fs');
var router = express.Router();
var db = require('../db');

var createTables = fs.readFileSync('db/dbSetup.txt').toString();
createTables += fs.readFileSync('db/dbData.txt').toString();

db.any(createTables)
   .then(function(myData) {
      console.log("Tables populated");   
      process.exit();
   })
   .catch(function(error) {
      console.log(error);
      process.exit();
   });
