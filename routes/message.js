/*
* This .js file enables users to send messages to the owner
* of the product they are interested in.For this function to
* work, the user need to be logged in. The user will fill out
* a form with their message which will then be stored in the
* seller's dashboard.
*/

var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var formidable = require('formidable');
var render = require('../models/loginCheck').renderUserAndCategory;


router.get('/', function(req,res,next) {
  var q = url.parse(req.url, true).query;
  var item = q.item;

  //Go to the item page and log in if not already logged in
  req.session.nextPage = '/item/' + item;
  res.redirect('/login');
});

router.post('/', function(req,res,next){

  //Form for the user interested in buying the item
  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    req.session.nextPage = '/item/' + fields.item_id;

    //Database query to enter the message details into the dashboard of the seller
    db.any(
        `INSERT INTO gator_message(
          message_text,
          user_id,
          item_id
        )
        VALUES
        (
            '` + fields.text_message +`',
            ` + req.session.user_id + `,
            ` + fields.item_id + `
        )`
    )
    .then(function(){
      res.redirect('messageSent');
    })
    .catch(e =>{
      console.log("Message Error");
      console.log(e);
      render(req, res, 'search', 'SEARCH PAGE', 'search');
    });
  });
});

module.exports = router;
