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

  router.get('/gayatri', function(req, res, next) {
    res.render('team/gayatri', { title: 'Gayatri', categories: cat });
  });
  router.get('/charul', function(req, res, next) {
    res.render('team/charul', { title: 'Charul', categories: cat });
  });
  router.get('/dylan', function(req, res, next) {
    res.render('team/dylan', { title: 'Dylan', categories: cat });
  });
  router.get('/moses', function(req, res, next) {
    res.render('team/moses', { title: 'Moses', categories: cat });
  });
  router.get('/peter', function(req, res, next) {
    res.render('team/peter', { title: 'Peter', categories: cat });
  });
  router.get('/regine', function(req, res, next) {
    res.render('team/regine', { title: 'Regine', categories: cat });
  });
  router.get('/divam', function(req, res, next) {
    res.render('team/divam', { title: 'Divam', categories: cat });
  });

  router.get('/post', function(req, res, next) {
    var user_id = req.signedCookies.id;
    console.log(req.signedCookies.id);
    if (user_id == false || !user_id) {
      res.redirect('./login');
    }
    else {
      res.render('post', { user: user_id, stylesheet:'post', categories: cat});
    }
  });

  router.get('/home',function(req,res,next){
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
    res.render('home', {title:'HOME PAGE', stylesheet:'home',item_set:default_items_set, categories: cat});
  });

  router.get('/details',function(req,res,next){
    res.render('details',{title:'DETAILS PAGE',stylesheet:'details', categories: cat});
  });

  router.get('/login',function(req,res,next){
    res.render('login',{title:'LOGIN PAGE',stylesheet:'login', categories: cat})
  });

  router.get('/register',function(req,res,next){
    res.render('register',{title:'REGISTRATION PAGE',stylesheet:'register', categories: cat})
  });
});

module.exports = router;
