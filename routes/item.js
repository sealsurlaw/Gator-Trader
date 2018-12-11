var express = require("express");
var router = express.Router();
var db = require('../db');
var render = require("../models/loginCheck").renderUserAndCategory;

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var user_id = req.session.user_id;
    if (!user_id) user_id = -1;
    db.any(`SELECT * FROM category`)
    .then( cat => db.any(`SELECT * FROM item WHERE item_id=` + id)
    .then( data => db.any(`SELECT * FROM user_record WHERE user_id=`+user_id)
    .then( user => {
        if (data[0].item_status == 'Approved' || user[0].admin_right == true || user[0].user_id == data[0].user_id) {
            cat.forEach(element => {
                if (element.category_id == data[0].category_id)
                    data[0].category = element.category_name;
            });
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