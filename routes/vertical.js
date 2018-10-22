var express = require("express");
var pgp = require('pg-promise');
var url = require('url');
var router = express.Router();
var db = require('../db');

/*

Usage:

  Input in the search bar
    http://localhost:3000/vertical?search=YOUR_SEARCH_QUERY

*/

router.get('/', function(req, res, next) {
  // Get query from url
  var q = url.parse(req.url, true).query;
  var search = q.search;
  var browse = q.browse;

  if (!search && !browse) {

    // Get categories
    db.any(`SELECT * FROM category`)
      .then(function(myData) {
        // Pass the categories to views/verticalEmpty.ejs
        res.render('verticalEmpty', { data: myData });
      })
      .catch(function(error) {
          console.log(error);
      });
  }
  else {
    // Display page with results if search query or browse

    // Access database, get all columns from Items table, and
    // select only the entries that have a title or description
    // that match the search query (case insensitive with ILIKE)

    // Searching
    if (search) {
      db.any(`SELECT * FROM item WHERE item_title ILIKE '%` +
        search + `%' OR item_description ILIKE '%` + search + `%'`)
        .then(function(myData) {
          // How many search results returned
          var numReturned = myData.length;
          // Pass the variables 'data' and 'size' to views/vertical.ejs
          res.render('vertical', { data: myData, size: numReturned });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // Browsing
    else if (browse) {
      db.any(`SELECT * FROM item WHERE category_id=` + browse)
        .then(function(myData) {
          // How many browse results returned
          var numReturned = myData.length;
          // Pass the variables 'data' and 'size' to views/vertical.ejs
          res.render('vertical', { data: myData, size: numReturned });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
  }
});
module.exports = router;
