/**
 * This script is responsible for populating the gator_message database.
 * The user has been given a default message for simplicity purpose.
 */

var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var formidable = require('formidable');
var render = require('../models/loginCheck').renderUserAndCategory;

/**
 * The rotue to message. Used to get details of item from url and include user_id.
 * Requires user to login, before contacting the seller.
 * @param req It is a request to http
 * @param res It is a response to http
 * @return void
 */
router.get('/', function(req,res) {
  var q = url.parse(req.url, true).query;
  var item = q.item;
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

  //Form gets parsed.
  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields){
  req.session.nextPage = '/item/' + fields.item_id;
  fields.text_message = fields.text_message.replace(/'/g, '&apos;');

  //DataBase insertion
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
