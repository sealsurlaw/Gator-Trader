/*
* The purpose of this .js file is to redirect users to the login page
* where they are presented with a form to fill in their credentials.
*/

var express = require("express");
var router = express.Router();
var db = require('../db');
var formidable = require('formidable');
var loginUser = require('../models/loginCheck').loginUser;

//uses post method
router.post('/', function(req, res, next) {
    console.log(req.signedCookies);
    var form = new formidable.IncomingForm();

    //Parse the information from the form and get the user_record from the database
    form.parse(req,function(err,fields,files){
        db.any(`SELECT * FROM user_record WHERE user_email='` + fields.email + `'`)
        .then(function (user){
            loginUser(req, res, user, fields);
        });
    });
});
module.exports = router;
