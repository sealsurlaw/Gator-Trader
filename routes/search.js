var express = require("express");
var url = require('url');
var router = express.Router();
var db = require('../db');
var renderUserAndCategory = require("../models/loginCheck").renderUserAndCategory;

router.get('/', function(req, res, next) {
    var q = url.parse(req.url, true).query;
    var search = q.search;
    var browse = q.browse;

    if (browse == -1) {
        search = '';
    }

    var where;

    if (search == '') {
        where = '';
    }
    else if (search) {
        where = ` WHERE item_title ILIKE '%` + search + `%' OR item_description ILIKE '%` + search + `%'`;
    }
    else if (browse) {
        where = ' WHERE category_id=' + browse;
    }

    db.any(`SELECT * FROM category`)
    .then( cat => 
    db.any(`SELECT * FROM item` + where)
    .then( data => {
        data.search = search;
        renderUserAndCategory(req, res, 'search', 'SEARCH PAGE', 'search', undefined, data);
    }));
});

module.exports = router;
