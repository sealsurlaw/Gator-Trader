var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/', function(req, res, next) {
  if (!req.session.user_id) {
    req.session.nextPage = '/dashboard';
    res.redirect('/login');
    return;
  }

  var q = url.parse(req.url, true).query;
  var remove = q.remove;

  if (remove && remove.length != 0) {
    console.log("Removing "+remove);
    db.any(`DELETE FROM item WHERE user_id=`+req.session.user_id+` AND item_id=`+remove)
    .catch( err => {
      console.log(err);
      render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {script: 'tabSwitcher', message: "Couldn't delete item"});
      return;
    });
    renderDashboard(req,res);
  }
  else {
    renderDashboard(req,res);
  }


});


var renderDashboard = function(req, res) {
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
