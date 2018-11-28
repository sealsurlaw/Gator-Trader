var express = require("express");
var router = express.Router();
var db = require('../db');
var renderUserAndCategory = require("../models/loginCheck").renderUserAndCategory;
router.get('/', function(req, res, next) {
    db.any(`SELECT * FROM item WHERE user_id =` + req.session.user_id )
    .then( data => {
      console.log (data)
      renderUserAndCategory (req, res,'dashboard', 'Dashboard Page','dashboard', undefined, data);
    });

});

module.exports = router;
