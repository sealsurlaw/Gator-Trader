var express = require("express");
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db.any(`INSERT INTO test_table ("testString") VALUES ('Hello at ${Date.now()}')`)
.then( _ => db.any(`SELECT * FROM test_table`) )
.then( results => res.json( results ) )
.catch( error => {
console.log( error )
res.json({ error })
});
});
module.exports = router;
