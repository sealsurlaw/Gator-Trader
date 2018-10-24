var express = require("express");
var pgp = require('pg-promise');
var url = require('url');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  db.any(`SELECT * FROM category`)
    .then(function(cat) {
      // Get query from url
      var q = url.parse(req.url, true).query;
      var search = q.search;
      var browse = q.browse;
      var queryData, numReturned;

      // Display page with results if search query or browse

      // Search by name
      if (search) {
        db.any(`SELECT * FROM item WHERE item_title ILIKE '%` +
          search + `%' OR item_description ILIKE '%` + search + `%'`)
          .then(function(myData) {
            // How many search results returned
            numReturned = myData.length;
            res.render('vertical', { data: myData, size: numReturned, categories: cat });
          })
          .catch(function(error) {
              console.log(error);
          });
      }

      // search by category
      else if (browse) {
        if (browse == -1) {
          db.any(`SELECT * FROM item`)
            .then(function(myData) {
            // How many browse results returned
            numReturned = myData.length;
            res.render('vertical', { data: myData, size: numReturned, categories: cat });
          })
          .catch(function(error) {
              console.log(error);
          });
        }
        else {
          db.any(`SELECT * FROM item WHERE category_id=` + browse)
            .then(function(myData) {
              // How many browse results returned
              numReturned = myData.length;
              res.render('vertical', { data: myData, size: numReturned, categories: cat });
            })
            .catch(function(error) {
                console.log(error);
            });
          }
      }

      else {
        res.render('vertical', { data: undefined, size: -1, categories: cat });
      }
  });
});
module.exports = router;
