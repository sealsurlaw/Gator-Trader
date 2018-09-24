// about.js
// csc648-01 fall2018 SFSU
// team 02

const express = require('express');
const router = express.Router();
/*
// to dispay static html pages
router.get('/:name', function(req,res,next){
	var name 		= req.params.name
	var filepath 	= __dirname
	filepath = filepath.replace("routes","");
	console.log(filepath);

	res.sendFile(filepath+'public/html/'+name+'.html');
});
*/

// to display pages through the view engine
router.get('/:name', function(req,res,next){
	var name = req.params.name
	res.render(name);
});

module.exports = router;