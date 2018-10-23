var express = require("express");
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db.any('INSERT INTO item ("item_title","item_description","item_price","item_availabilty","item_status","item_image") VALUES ("Mobile","I want to sell my mobile - low price, good condition","$200.00","Available","Pending",bytea("/Users/gayatripise/Desktop/mobile1.jpeg"))')
.then( _ => db.any('SELECT * FROM item_record') )
.then( results => res.json( results ) )
.catch( error => {
console.log( error )
res.json({ error })
});
});
module.exports = router;