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

/**
 * The route to message. Used to get details of item from url and include user_id.
 * Requires user to login, before contacting the seller.
 * @param req It is a request to http
 * @param res It is a response to http
 * @return void
 */
router.get('/', function(req,res) {
  var q = url.parse(req.url, true).query;
  var item = q.item;

  //Go to the item page and log in if not already logged in
  req.session.nextPage = '/item/' + item;
  res.redirect('/login');
});

/**
 * The database gets populated here through parsing of incoming forms
 * @param req it is a request to http
 * @param res it is a response to http
 * @return void
 */
router.post('/', function(req,res){

  //Form for the user interested in buying the item
  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields){
  req.session.nextPage = '/item/' + fields.item_id;
  fields.text_message = fields.text_message.replace(/'/g, '&apos;');

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
    //Produces a confirmation on a newtab.
    .then(function(){
      res.redirect('messageSent');
    })
    //Catches error and renders to search page.
    .catch(e =>{
      console.log("Message Error");
      console.log(e);
      render(req, res, 'search', 'SEARCH PAGE', 'search');
    });
  });
});

module.exports = router;
