var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db.any(`SELECT * FROM category`)
    .then( cat => db.any(`SELECT * FROM item WHERE item_id=` + id)
    .then( data => {
        cat.forEach(element => {
            if (element.category_id == data[0].category_id)
                data[0].category = element.category_name;
        });
        render(req, res, 'details', 'DETAILS PAGE', 'details', {script: 'details', data: data[0]});
        // res.render( 'details', {data: data[0], title: 'DETAILS PAGE', stylesheet: 'details', categories: cat, category: category} );
    }))
    .catch( (e) => {
        res.render('error');
    });
});

module.exports = router;