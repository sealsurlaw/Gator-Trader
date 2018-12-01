/**
 * This script is responsible for producing dashboard results from the databse.
 * It allows the user to look at thier items for sale and messages from users who are
 * interested in buying the item.
 */
var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

/**
 * The route to dashboard.
 * @param req request to http
 * @param res response to http
 * @return void
 */

router.get('/', function(req, res) {
  if (!req.session.user_id) {
    req.session.nextPage = '/dashboard';
    res.redirect('/login');
    return;
  }
  //Insertion of dashboard items into dashboard database.
  db.any(`SELECT * FROM item WHERE user_id =` + req.session.user_id )
  .then( data => db.any(`SELECT * from category`)
  .then( cats => {

    // Items
    data.forEach(item => {
      cats.forEach(cat => {
        if (item.category_id == cat.category_id) {
          item.item_category = cat.category_name;
        }
      });
    });

    // Messages
    if (data.length > 0) {
      var where = ' WHERE ';
      data.forEach(element => {
        where += 'item_id='+element.item_id+' OR ';
      });
      where = where.substr(0, where.length-4);
      db.any(`SELECT * FROM gator_message`+where)
      .then( messages => {
        // Get usernames associated with IDs
        where = ' WHERE ';
        messages.forEach(element => {
          where += 'user_id='+element.user_id+' OR ';
        });
        where = where.substr(0, where.length-4);
        db.any(`SELECT user_id, user_name FROM user_record`+where)
        .then( usernames => {
          // Map username with message
          messages.forEach( element => {
            usernames.forEach( element2 => {
              if (element.user_id == element2.user_id)
                element.user_name = element2.user_name;
            });
          });
          data.messages = messages;
          render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {data: data});
        })
      })
    }
    else {
      render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {data: data});
    }
  }));

});

module.exports = router;
