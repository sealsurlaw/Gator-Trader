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
router.get('/insert_item', function(req, res, next) {
  db.any(`SELECT * FROM category`)
  .then(function(cat) {
    db.any(`SELECT * FROM user_record`)
    .then(function(user) {
      res.render('insert_item', { users: user, categories: cat });
    });
  });
});

router.get('/homePage',function(req,res,next){
  var default_item={
    'item_id':'1',
    'item_image_thumbnail':'/images/ny.jpg',
    'item_title':'New York'
  };

  var default_items_set={
    'books':{
      '0':default_item,
      '1':default_item,
      '2':default_item,
      '3':default_item,
      '4':default_item,
      '5':default_item,
      '6':default_item
    },
    'books1':{
      '0':default_item,
      '1':default_item,
      '2':default_item,
      '3':default_item,
      '4':default_item,
      '5':default_item,
      '6':default_item
    },
    'books2':{
      '0':default_item,
      '1':default_item,
      '2':default_item,
      '3':default_item,
      '4':default_item,
      '5':default_item,
      '6':default_item
    }
  };

  res.render('homePage', {title:'HOME PAGE', stylesheet:'homePage',item_set:default_items_set});
});

router.get('/searchPage',function(req,res,next){
  res.render('searchPage',{title:'SEARCH PAGE',stylesheet:'searchPage'});
});

router.get('/detailsPage',function(req,res,next){
  res.render('detailsPage',{title:'DETAILS PAGE',stylesheet:'detailsPage'});
});

router.get('/LoginPage',function(req,res,next){
  res.render('LoginPage',{title:'LOGIN PAGE',stylesheet:'LoginPage'})
});

router.get('/RegPage',function(req,res,next){
  res.render('RegPage',{title:'REGISTRATION PAGE',stylesheet:'RegPage'})
});

router.get('/PostItem',function(req,res,next){
  res.render('PostItem',{title:'POST ITEM PAGE',stylesheet:'PostItem'})
});

/*
router.get('/',function(req,res,next){
  res.render('',{title:'',stylesheet:''})
});
*/
module.exports = router;
