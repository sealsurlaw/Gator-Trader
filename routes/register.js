/*
* This .js allows users to register on the website. The users are required to
* fill out a form where they input their email id, username and password.
* This will be stored in the database under the user_id of the user.
* This is also where the password is hashed and stored in the database
* only after hashing.
*/

var express = require("express");
var pgp = require('pg-promise');
var url = require('url');
var router = express.Router();
var db = require('../db');
var formidable = require('formidable');
var pswdHash = require('password-hash');
var render = require("../models/loginCheck").renderUserAndCategory;

//uses post method
router.post('/', function(req, res, next) {

  //Calling the IncomingForm
  var form = new formidable.IncomingForm();
  //Form Parsing takes place here
  form.parse(req,function(err,fields,files){

    //Hash the password here
  var hashedPassword = pswdHash.generate(fields.password);

  //Query to store data into the database
  db.any(
          `INSERT INTO user_record(
            user_name,
            user_password,
            user_email,
            admin_right
            )
            VALUES
            (
              '`+ fields.username + `',
              '`+ hashedPassword + `',
              '`+ fields.email + `',
              false
            )`
          )
  .then( function() {
    //route to login page for registered user to log in
    res.redirect('./login');
  })
  .catch( e => {
    console.log('Couldn\'t add user');
    console.log(e);
    render(req, res, 'register', 'REGISTRATION PAGE', 'register', {script: 'register', message: "Email or Username already exists"});
    // res.render('register', {title:'REGISTRATION PAGE', stylesheet:'register', message: "Email already exists", categories: cat});
  })
})

});
module.exports = router;
