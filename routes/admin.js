/*
* The purpose of this .js is to route an admin to their admin dashboard
* where they have the ability to approve or deny items that
* are pending as well as remove users.
*/

var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;
var formatDate = require('../models/loginCheck').formatDate;

router.get('/', function(req, res, next){

  if (!req.session.user_id) {
    res.redirect('/home');
    return;
  }

  // Check if admin right is true from the database based on
  //user id of the user logged in
  db.any(`SELECT admin_right FROM user_record WHERE user_id=`+ req.session.user_id)
  .then(isAdmin =>{

    // Get query from url
    var q = url.parse(req.url, true).query;
    var removeUser = parseInt(q.remove_user);
    var removeItem = parseInt(q.remove_item);
    var approveItem = parseInt(q.approve_item);
    var filters = {}
    filters.items = q.sort_item;
    filters.users = q.sort_user;
    filters.type = q.type;

    var query = '';

    // Form query string
    if (removeUser) {
      query = `DELETE FROM user_record WHERE user_id=`+removeUser;
    }
    else if (removeItem) {
      query = `DELETE FROM item WHERE item_id=`+removeItem;
    }
    else if (approveItem) {
      query = `UPDATE item SET item_status='Approved' WHERE item_id=`+approveItem;
    }

    // Run query and render, or just render
    if (query != '') {
      db.any(query)
      .then( _ => {
        renderAdmin(req, res, filters);
      });
    }
    else {
      renderAdmin(req, res, filters);
    }
  });
});

/*
* Render Function Starts here. Depending on what the admin
* decides to do eg. filter items, remove items, remove users etc
* go to the database place query accordingly.
*/
var renderAdmin = function(req, res, filter){
  var sortUsers = '';
  var sortItems = ` ORDER BY item_status DESC`;

  if (filter.items) {
    sortItems += ', '+filter.items+' '+filter.type;
  }
  if (filter.users) {
    sortUsers = ' ORDER BY '+filter.users+' '+filter.type;
  }

  console.log(sortItems);

  // Get all the pending items
  db.any(`SELECT * FROM item`+sortItems)
  .then( pendingItems => db.any('SELECT * FROM category')
  .then (cats => {

    // Attach items to data
    var data = {};
    data.items = pendingItems;

    // Attach categories to each item
    data.items.forEach(item => {
      if (item.item_status == 'Pending')
        item.pending = true;
      item.item_date = formatDate(item.item_date);
      cats.forEach(cat =>{
        if (item.category_id == cat.category_id){
          item.item_category = cat.category_name;
        }
      });
    });

    // Get all the users from the database
    db.any(`SELECT * FROM user_record`+sortUsers)
    .then (users => db.any(`SELECT * FROM item`)
    .then (items => {
      users.forEach(user =>{
        user.items= [];
        user.user_date = formatDate(user.user_date).replace(/<br>/g, ' ');
        items.forEach(item => {
          if(  user.user_id == item.user_id){
            user.items.push(item);
          }
        });
      });

      // Attach users to data
      data.users = users;
      render(req, res, 'admin', 'ADMIN PAGE', 'admin', {data: data, script: 'tabSwitcher'});
    }))

  }))
}

module.exports = router;
