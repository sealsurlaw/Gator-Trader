/**
 * This script is responsible for producing dashboard results from the databse.
 * It allows the user to look at thier items for sale and messages from users who are
 * interested in buying the item.
 */
var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;
var formatDate = require('../models/loginCheck').formatDate;

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

  var q = url.parse(req.url, true).query;
  var remove = q.remove;
  var filters = {}
  filters.items = q.sort_item;
  filters.messages = q.sort_message
  filters.type = q.type;


  if (remove && remove.length != 0) {
    console.log("Removing "+remove);
    db.any(`DELETE FROM item WHERE user_id=`+req.session.user_id+` AND item_id=`+remove)
    .then( _ => {
      renderDashboard(req,res);
    })
    .catch( err => {
      console.log(err);
      render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {script: 'tabSwitcher', message: "Couldn't delete item"});
      return;
    });
  }
  else {
    renderDashboard(req,res,filters);
  }


});


var renderDashboard = function(req, res, filter) {

  var sortItems = '';
  var sortMessages = '';

  if (filter.items) {
    sortItems = ' ORDER BY '+filter.items+' '+filter.type;
  }
  if (filter.messages) {
    sortMessages = ' ORDER BY '+filter.messages+' '+filter.type;
  }

  db.any(`SELECT * FROM item WHERE user_id =`+req.session.user_id + sortItems )
  .then( data => db.any(`SELECT * from category`)
  .then( cats => {

    var items = data;
    data = {};
    data.items = items;

    // ITEMS
    data.items.forEach(item => {

      item.item_date = formatDate(item.item_date);

      cats.forEach(cat => {
        if (item.category_id == cat.category_id) {
          item.item_category = cat.category_name;
        }
      });
    });





    // Messages
    if (data.items.length > 0) {
      var where = ' WHERE ';
      data.items.forEach(element => {
        where += 'item_id='+element.item_id+' OR ';
      });
      where = where.substr(0, where.length-4);
      db.any(`SELECT * FROM gator_message`+where+sortMessages)
      .then( messages => {
        // Get usernames associated with IDs
        where = ' WHERE ';
        var whereItem = ' WHERE ';
        messages.forEach(element => {
          where += 'user_id='+element.user_id+' OR ';
        });
        where = where.substr(0, where.length-4);
        db.any(`SELECT user_id, user_name FROM user_record`+where)
        .then( usernames => {
          // Map username with message
          messages.forEach( element => {
            element.message_date = formatDate(element.message_date).replace(/<br>/g, ' ');
            usernames.forEach( element2 => {
              if (element.user_id == element2.user_id)
                element.user_name = element2.user_name;
            });
            data.items.forEach( item => {
              if (item.item_id == element.item_id)
                element.item_title = item.item_title;
            });
          });
          data.messages = messages;

          render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {data: data, script: 'tabSwitcher'});
        })
      })
    }
    else {
      render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {data: data, script: 'tabSwitcher'});
    }
  }));
}

module.exports = router;
