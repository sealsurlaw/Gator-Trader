/*
* The purpose of this .js file to redirect to a specific item that
* was clicked on by the user. Depeding on the item_id, we get
* the item and its details from the database.
*/
var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    //Get item and category depending on the item clicked from the URL
    db.any(`SELECT * FROM category`)
    .then( cat => db.any(`SELECT * FROM item WHERE item_id=` + id)
    .then( data => {
        cat.forEach(element => {
            if (element.category_id == data[0].category_id)
                data[0].category = element.category_name;
        });
        //Go to a new page called details page to show the item 
        render(req, res, 'details', 'DETAILS PAGE', 'details', {data: data[0]});
        // res.render( 'details', {data: data[0], title: 'DETAILS PAGE', stylesheet: 'details', categories: cat, category: category} );
    }))
    .catch( (e) => {
        res.render('error');
    });
});

module.exports = router;
