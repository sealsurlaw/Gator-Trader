/*
* The function of this .js file is to back to the original search page and
* end the current session.
*/
var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.destroy( err => {
        res.redirect('back');
    })
});

module.exports = router;
