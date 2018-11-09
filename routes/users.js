var express = require('express');
var router = express.Router();
var check = require('../models/loginCheck');

/* GET users listing. */
router.get('/', function(req, res, next) {
    check.getLoggedInUserFromDB(req)
    .then( thisUser => {
      console.log(thisUser);
      res.render('users', { user: thisUser[0] } );
    })
    .catch( e => {
      console.log("No user logged in");
      res.render('users');
    });
});

module.exports = router;
