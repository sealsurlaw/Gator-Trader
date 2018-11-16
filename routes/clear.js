var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.clearCookie('id').redirect('/search?search=');
});

module.exports = router;