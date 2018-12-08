var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/' ,function(req, res) {

  db.any(`SELECT * FROM category`)
  .then( categories => {

    let categoryIDs = [];

    categories.forEach( category => {
      categoryIDs.push({id: category.category_id, name: category.category_name});
    });

    db.any(`SELECT * FROM item ORDER BY category_id ASC, item_date DESC`)
    .then( items => {

      let itemArray = [];

      for (let i = 0; i < categoryIDs.length; ++i) {
        let catID = categoryIDs[i].id;
        itemArray[i] = {};
        itemArray[i].items = [];
        let count = 0;
        for (let j = 0; j < items.length; ++j) {
          let item = items[j];
          if (item.category_id == catID && item.item_status == 'Approved') {
            itemArray[i].items.push(item);
            count++;
          }
          if (count >= 4 || item.category_id > catID) {
            count = 0;
            break;
          }
        };
        itemArray[i].category_name = categoryIDs[i].name;
      };
      render(req, res, 'home', 'HOME PAGE', 'home', {data: itemArray});
    }) 
  })
});

module.exports = router;
