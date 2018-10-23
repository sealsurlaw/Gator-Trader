var express = require("express");
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
	db.any('INSERT INTO category (category_name) VALUES ("BOOKS")')
.then( _ => db.any('SELECT * from category'))
.then( results => res.json( results ) )
.catch( error => {
console.log( error )
res.json({ error })
});
});
module.exports = router;
