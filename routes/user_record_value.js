var express = require("express");
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db.any(`INSERT INTO user_record ("user_name","user_password","user_email","admin_right") VALUES ('gayatri','oct1234','gpise@yahoo.com','0')';
.then( _ => db.any('SELECT * FROM user_record') )
.then( results => res.json( results ) )
.catch( error => {
console.log( error )
res.json({ error })
});
});
module.exports = router;