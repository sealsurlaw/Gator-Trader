var express = require("express");
var router = express.Router();
var db = require('../db');
var formidable = require('formidable');

var loginUser = require('../models/loginCheck').loginUser;

//uses post method
router.post('/', function(req, res, next) {
    console.log(req.signedCookies);
    var form = new formidable.IncomingForm();

    form.parse(req,function(err,fields,files){
        db.any(`SELECT * FROM user_record WHERE user_email='` + fields.UserEmail + `'`)
        .then(function (user){
            loginUser(res, user, fields);
        });
    });
});
module.exports = router;
