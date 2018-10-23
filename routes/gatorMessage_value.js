var express = require("express");
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
	db.any('INSERT INTO gator_message (message_text) VALUES ("Please provide your contacct details")')
.then( _ => db.any('SELECT * from gator_message'))
.then( results => res.json( results ) )
.catch( error => {
console.log( error )
res.json({ error })
});
});
module.exports = router;
