var express = require("express");
// var router = express.Router();
var db = require('../db');
var formidable = require('formidable');

var verifyUser = require('../models/loginCheck').verifyUser;

function loginModel (req, res, next) {
    console.log(req.signedCookies);
    var form = new formidable.IncomingForm();

    form.parse(req,function(err,fields,files){
        db.any(`SELECT * FROM user_record WHERE user_email='` + fields.email + `'`)
        .then(function (user){
            verifyUser(res, user, fields);
        });
    });
}

module.exports = loginModel;