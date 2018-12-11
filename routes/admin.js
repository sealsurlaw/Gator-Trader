var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;
var formatDate = require('../models/loginCheck').formatDate;

router.get('/', function(req, res, next){

  // Check if user is logged in
  // if (!req.session.user_id){
  //   req.session.nextPage = '/admin';
  //   res.redirect('/login');
  //   return;
  // }

  // Check if admin
  db.any(`SELECT admin_right FROM user_record WHERE user_id=`+ req.session.user_id)
  .then(isAdmin =>{
    // if(!isAdmin[0].admin_right){
    //   res.redirect('/dashboard');
    //   return;
    // }

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

//Render Function Starts here
var renderAdmin = function(req, res, filter){
  var sortUsers = '';
  var sortItems = '';

  if (filter.items) {
    sortItems = ' ORDER BY '+filter.items+' '+filter.type;
  }
  if (filter.users) {
    sortUsers = ' ORDER BY '+filter.users+' '+filter.type;
  }

  // Get all the pending items
  db.any(`SELECT * FROM item`+sortItems+` ORDER BY item_status DESC`)
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

    // Get all the users
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
