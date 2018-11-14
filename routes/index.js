var express = require('express');
var router = express.Router();
var db = require('../db');

db.any(`SELECT * FROM category`)
.then(function(cat) {

  router.get('/', function(req, res, next) {
    res.render('vertical', { categories: cat });
  });

  router.get('/index', function(req, res, next) {
    res.render('index', { title: 'index', categories: cat });
  });

  router.get('/Gayatri', function(req, res, next) {
    res.render('gayatri', { title: 'Gayatri', categories: cat });
  });
  router.get('/Charul', function(req, res, next) {
    res.render('Charul', { title: 'Charul', categories: cat });
  });
  router.get('/Dylan', function(req, res, next) {
    res.render('dylan', { title: 'Dylan', categories: cat });
  });
  router.get('/Moses', function(req, res, next) {
    res.render('Moses', { title: 'Moses', categories: cat });
  });
  router.get('/Peter', function(req, res, next) {
    res.render('Peter', { title: 'Peter', categories: cat });
  });
  router.get('/Regine', function(req, res, next) {
    res.render('regine', { title: 'Regine', categories: cat });
  });
  router.get('/Divam', function(req, res, next) {
    res.render('Divam', { title: 'Divam', categories: cat });
  });
  router.get('/PostItem', function(req, res, next) {
    var user_id = req.signedCookies.id;
    console.log(req.signedCookies.id);
    if (user_id == false || !user_id) {
      res.redirect('./LoginPage');
    }
    else {
      res.render('PostItem', { user: user_id, stylesheet:'PostItem', categories: cat});
    }
  });
  router.get('/register', function(req, res, next) {
    res.render('register', {categories: cat});
  });
  router.get('/login', function(req, res, next) {
    res.render('login', {categories: cat});
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
    res.render('homePage', {title:'HOME PAGE', stylesheet:'homePage',item_set:default_items_set, categories: cat});
  });

  router.get('/searchPage',function(req,res,next){
    res.render('searchPage',{title:'SEARCH PAGE',stylesheet:'searchPage', categories: cat});
  });

  router.get('/detailsPage',function(req,res,next){
    res.render('detailsPage',{title:'DETAILS PAGE',stylesheet:'detailsPage', categories: cat});
  });

  router.get('/LoginPage',function(req,res,next){
    res.render('LoginPage',{title:'LOGIN PAGE',stylesheet:'LoginPage', categories: cat})
  });

  router.get('/RegPage',function(req,res,next){
    res.render('RegPage',{title:'REGISTRATION PAGE',stylesheet:'RegPage', categories: cat})
  });
});

/*router.get('/PostItem',function(req,res,next){
  res.render('PostItem',{title:'POST ITEM PAGE',stylesheet:'PostItem'})
});*/

/*
router.get('/',function(req,res,next){
  res.render('',{title:'',stylesheet:''})
});
*/
module.exports = router;
