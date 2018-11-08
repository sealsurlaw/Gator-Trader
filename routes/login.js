var express = require("express");
var router = express.Router();

var loginModel = require('../models/loginModel');

//uses post method
router.post('/', function(req, res, next) {
    loginModel(req,res,next);
});
module.exports = router;