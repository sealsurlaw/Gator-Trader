var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.any(`SELECT * FROM category`)
    .then(function(cat) {
      res.render('vertical', { categories: cat });
    });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/Gayatri', function(req, res, next) {
  res.render('gayatri', { title: 'Gayatri' });
});
router.get('/Charul', function(req, res, next) {
  res.render('Charul', { title: 'Charul' });
});
router.get('/Dylan', function(req, res, next) {
  res.render('dylan', { title: 'Dylan' });
});
router.get('/Moses', function(req, res, next) {
  res.render('Moses', { title: 'Moses' });
});
router.get('/Peter', function(req, res, next) {
  res.render('Peter', { title: 'Peter' });
});
router.get('/Regine', function(req, res, next) {
  res.render('regine', { title: 'Regine' });
});
router.get('/Divam', function(req, res, next) {
  res.render('Divam', { title: 'Divam' });
});
router.get('/home_test', function(req, res, next) {
  db.any(`SELECT * FROM category`)
    .then(function(cat) {
      res.render('home_test', { title: 'Express', categories: cat });
    });
});

module.exports = router;
