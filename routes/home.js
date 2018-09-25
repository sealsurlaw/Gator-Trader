// home.js
// csc648-01 fall2018 SFSU
// team 02

const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
	res.render('About',{ title:'About Us' })
});

module.exports = router;