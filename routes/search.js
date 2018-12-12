var express = require("express");
var url = require('url');
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/', function(req, res, next) {
    var q = url.parse(req.url, true).query;
    var search = q.search;
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

    db.any(`SELECT * FROM category`)
    .then( cat =>
    db.any(`SELECT * FROM item` + where)
    .then( data => {
        data.search = search;
        render(req, res, 'search', 'SEARCH PAGE', 'search', {data: data});
    }));
});

module.exports = router;
