var express = require("express");
var pgp = require('pg-promise');
var url = require('url');
var router = express.Router();
var db = require('../db');
var formidable = require('formidable');
var pswdHash = require('password-hash');
var entryName = false;
var entryPass = false;
var entryEmail = false;
//uses post method
router.post('/', function(req, res, next) {

//Calling the IncomingForm
 var form = new formidable.IncomingForm();
//Form Parsing takes place here
  form.parse(req,function(err,fields,files){

    //password gets stored here
    var pswd = fields.userPswd;
    var userName = fields.userName;
    var userEmail = fields.userEmail;

    //If username is not undefined
    if(userName)
    {
      userName = userName.replace(/ +/g,"");
      console.log(userName);
      entryName = true;
    }

    //password gets salted and hashed here
    var hashedPassword = pswdHash.generate(pswd);
    //Debugging purposes
    console.log(pswd);
    console.log(hashedPassword);
    console.log(fields.userName);
    //Confirmed password field gets saved here
    var cpswd = fields.rePswd;
    console.log(typeof(pswd));
    //If userpassword is not undefined
    if(pswd && cpswd)
    {
      entryPass = true;
    }
    //if userEmail is not defined
    if(userEmail)
    {
      entryEmail = true;
    }
  //Used for later stages in log-in page
  //console.log(pswdHash.verify(pswd, hashedPassword));

    //Checking if original password and confirm password fields match
    //If they do you insert into database
    if(pswd === cpswd && entryName && entryPass && entryEmail)
    {
      //page gets rendered
      res.render('Regpage');
      //data gets inserted into database
      db.any(`INSERT INTO user_record(
        user_name,
        user_password,
        user_email,
        admin_right
      )
      VALUES
      (
        '`+ userName + `',
        '`+ hashedPassword + `',
        '`+ fields.userEmail + `',
        false
      )`
     )
    }
    //if passwords do not match
    else {
      res.render('RegPage' , {match : false});
    }

  });

});
module.exports = router;
