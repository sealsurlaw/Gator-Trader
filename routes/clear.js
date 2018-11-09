var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.clearCookie('id').render('users');
});

module.exports = router;