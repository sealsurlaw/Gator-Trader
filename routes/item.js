/*
* The purpose of this .js file to redirect to a specific item that
* was clicked on by the user. Depending on the item_id, we get
* the item and its details from the database.
*/
var express = require("express");
var router = express.Router();
var url = require('url');
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

/*
* Here the function parses through the query to get what item was clicked
* on and then fetches it from the database.
* It checks to make sure this item has been approved.
* Then it takes the user to the details page for the item that
* was clicked on.
*/
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var q = url.parse(req.url, true).query;
    var open = q.open;

    if (!req.session.user_id && open) {
        req.session.nextPage = '/item/'+id+'?open=true';
        res.redirect('/login');
        return;
    }
    var user_id = req.session.user_id;
    if (!user_id) user_id = -1;
    //Fetch item from database
    db.any(`SELECT * FROM category`)
    .then( cat => db.any(`SELECT * FROM item WHERE item_id=` + id)
    .then( data => db.any(`SELECT * FROM user_record WHERE user_id=`+user_id)
    .then( user => {
        if (data[0].item_status == 'Approved' || user[0].admin_right == true || user[0].user_id == data[0].user_id) {
            cat.forEach(element => {
                if (element.category_id == data[0].category_id)
                    data[0].category = element.category_name;
            });
            //direct to details page
            render(req, res, 'details', 'DETAILS PAGE', 'details', {script: 'details', data: data[0]});
        }
        else {
            res.redirect('/');
        }
    })))
    .catch( (e) => {
        console.log(e);
        res.redirect('/');
    });
});

module.exports = router;
