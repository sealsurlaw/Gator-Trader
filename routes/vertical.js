/*
* This file was for the vertical prototype and to get out website up
* and running the first time. This page had the search bar and search
* by category functionalities. 
*/

var express = require("express");
var pgp = require('pg-promise');
var url = require('url');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  // Get all categories from database
  db.any(`SELECT * FROM category`)
    // Query returns with data called 'cat'
    .then(function(cat) {
      // Get query from url
      var q = url.parse(req.url, true).query;
      // Store search query if exists
      var search = q.search;
      // Store browse query if exists
      var browse = q.browse;
      // Number of results returned from database
      var numReturned;

      // Display page with results if search query or browse

      // If nothing in the search bar
      if (search == '') {
        // Get all items in database
        db.any(`SELECT * FROM item`)
          // Query returns with data called 'myData'
          .then(function(myData) {
          // How many browse results returned
          numReturned = myData.length;
          // Go to page 'vertical.handlebars' passing in selected items, number of search results, and categories
          res.render('vertical', { data: myData, size: numReturned, categories: cat });
        })
        .catch(function(error) {
          // Print out error
          console.log(error);
        });
      }

      // Search by name
      else if (search) {
        // Get items from database where item title and item description have
        // some part of it matching the search query
        db.any(`SELECT * FROM item WHERE item_title ILIKE '%` +
          search + `%' OR item_description ILIKE '%` + search + `%'`)
          // Query returns with data called 'myData'
          .then(function(myData) {
            // How many search results returned
            numReturned = myData.length;
            // Go to page 'vertical.handlebars' passing in selected items, number of search results, and categories
            res.render('vertical', { data: myData, size: numReturned, categories: cat, searchQuery: search });
          })
          .catch(function(error) {
            // Print out error
            console.log(error);
          });
        }

      // Browse by category
      else if (browse) {
        // Default value for all categories is '-1'
        if (browse == -1) {
          // Get all items in the database
          db.any(`SELECT * FROM item`)
            // Query returns with data called 'myData'
            .then(function(myData) {
            // How many browse results returned
            numReturned = myData.length;
            // Go to page 'vertical.handlebars' passing in selected items, number of search results, and categories
            res.render('vertical', { data: myData, size: numReturned, categories: cat });
          })
          .catch(function(error) {
            // Print out error
            console.log(error);
          });
        }
        else {
          // Get items in database that have category ID defined in url
          db.any(`SELECT * FROM item WHERE category_id=` + browse)
            // Query returns with data called 'myData'
            .then(function(myData) {
              // How many browse results returned
              numReturned = myData.length;
              res.render('vertical', { data: myData, size: numReturned, categories: cat });
            })
            .catch(function(error) {
              // Print out error
              console.log(error);
            });
          }
        }

      // No search or browse
      else {
        // Go to page 'vertical.handlebars' passing no search / no browse defaults
        res.render('vertical', { categories: cat });
      }
  });
});
module.exports = router;
