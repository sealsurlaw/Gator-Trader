var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var formidable = require('formidable');
var render = require('../models/loginCheck').renderUserAndCategory;


router.get('/', function(req,res,next) {
  var q = url.parse(req.url, true).query;
  var item = q.item;

  req.session.nextPage = '/item/' + item;
  res.redirect('/login');
});

router.post('/', function(req,res,next){

  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){
    req.session.nextPage = '/item/' + fields.item_id;

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
