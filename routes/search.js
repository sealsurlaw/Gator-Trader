/*
* This .js file allows users to search for items on the website.
* The users can search by entering text into the search bar or by using
* the dropdown of categories available. If the search bar is left empty
* then all the items will be displayed.
*/

var express = require("express");
var url = require('url');
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/', function(req, res, next) {
    var q = url.parse(req.url, true).query;
    var search = q.search;
    var browse = q.browse;
    var browseCatName = -1;
    var category = q.category;

    var where = '';

    if (search == '') {
        where = ` WHERE item_status='Approved'`;
    }
    else if (search) {
        where = ` WHERE item_status='Approved' AND (item_title ILIKE '%` + search + `%' OR item_description ILIKE '%` + search + `%')`;
    }

    if (category && category != -1) {
        where += ' AND category_id='+category
    }

    //Get item and category from the database
    db.any(`SELECT * FROM category`)
    .then( cat =>
    db.any(`SELECT * FROM item` + where)
    .then( data => {
        if (browseCatName) {
            if (browse != '-1') {
                browseCatName = browse;
                cat.forEach(element => {
                    if (element.category_id == browseCatName) browseCatName = element.category_name; 
                 });
                 data.category_name = browseCatName;
            }
        }
        data.search = search;
        render(req, res, 'search', 'SEARCH PAGE', 'search', {data: data});
    }));
});

module.exports = router;
