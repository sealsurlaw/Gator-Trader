var express = require('express');
var router = express.Router();
var db = require('../db');
var renderUserAndCategory = require('../models/loginCheck').renderUserAndCategory;

router.get('/', function(req, res, next) {
  // res.render('vertical', { categories: cat });
  renderUserAndCategory(req, res, 'home', 'HOME PAGE', 'home');
});

router.get('/index', function(req, res, next) {
  // res.render('index', { title: 'index', categories: cat });
  renderUserAndCategory(req, res, 'index', 'ABOUT', null);
});

router.get('/gayatri', function(req, res, next) {
  // res.render('team/gayatri', { title: 'Gayatri', categories: cat });
  renderUserAndCategory(req, res, 'team/gayatri', 'ABOUT', null);
});
router.get('/charul', function(req, res, next) {
  // res.render('team/charul', { title: 'Charul', categories: cat });
  renderUserAndCategory(req, res, 'team/charul', 'ABOUT', null);
});
router.get('/dylan', function(req, res, next) {
  // res.render('team/dylan', { title: 'Dylan', categories: cat });
  renderUserAndCategory(req, res, 'team/dylan', 'ABOUT', null);
});
router.get('/moses', function(req, res, next) {
  // res.render('team/moses', { title: 'Moses', categories: cat });
  renderUserAndCategory(req, res, 'team/moses', 'ABOUT', null);
});
router.get('/peter', function(req, res, next) {
  // res.render('team/peter', { title: 'Peter', categories: cat });
  renderUserAndCategory(req, res, 'team/peter', 'ABOUT', null);
});
router.get('/regine', function(req, res, next) {
  // res.render('team/regine', { title: 'Regine', categories: cat });
  renderUserAndCategory(req, res, 'team/regine', 'ABOUT', null);
});
router.get('/divam', function(req, res, next) {
  // res.render('team/divam', { title: 'Divam', categories: cat });
  renderUserAndCategory(req, res, 'team/divam', 'ABOUT', null);
});

router.get('/post', function(req, res, next) {
  var user_id = req.session.user_id
  if (user_id == false || !user_id) {
    res.redirect('./login');
  }
  else {
    // res.render('post', { user: user_id, stylesheet:'post', categories: cat});
    renderUserAndCategory(req, res, 'post', 'POST PAGE', 'post');
  }
});

router.get('/home',function(req,res,next){

  // var default_item={
  //   'item_id':'1',
  //   'item_image_thumbnail':'/images/ny.jpg',
  //   'item_title':'New York'
  // };

  // var default_items_set={
  //   'books':{
  //     '0':default_item,
  //     '1':default_item,
  //     '2':default_item,
  //     '3':default_item,
  //     '4':default_item,
  //     '5':default_item,
  //     '6':default_item
  //   },
  //   'books1':{
  //     '0':default_item,
  //     '1':default_item,
  //     '2':default_item,
  //     '3':default_item,
  //     '4':default_item,
  //     '5':default_item,
  //     '6':default_item
  //   },
  //   'books2':{
  //     '0':default_item,
  //     '1':default_item,
  //     '2':default_item,
  //     '3':default_item,
  //     '4':default_item,
  //     '5':default_item,
  //     '6':default_item
  //   }
  // };
  // res.render('home', {title:'HOME PAGE', stylesheet:'home', item_set:default_items_set, categories: cat});
  renderUserAndCategory(req, res, 'home', 'HOME PAGE', 'home');
});

router.get('/details',function(req,res,next){
  renderUserAndCategory(req, res, 'details', 'DETAILS PAGE', 'details');
  // res.render('details',{title:'DETAILS PAGE', stylesheet:'details', categories: cat});
});

router.get('/login',function(req,res,next){
  // res.render('login',{title:'LOGIN PAGE', stylesheet:'login', categories: cat})
  renderUserAndCategory(req, res, 'login', 'LOGIN PAGE', 'login');
});

router.get('/register',function(req,res,next){
  // var user_id = req.session.user_id;
  // if (user_id) {
  //   db.any(`SELECT user_name FROM user_record WHERE user_id=` + user_id)
  //   .then( (user) => {
  //     res.render('register',{title:'REGISTRATION PAGE', stylesheet:'register', categories: cat, username: user[0].user_name})
  //   });
  // }
  // else {
  //   res.render('register',{title:'REGISTRATION PAGE', stylesheet:'register', categories: cat})
  // }
  renderUserAndCategory(req, res, 'register', 'REGISTRATION PAGE', 'register', 'register');
});

//router.get('/dashboard',function(req,res,next){
//   // res.render('login',{title:'LOGIN PAGE', stylesheet:'login', categories: cat})
  //renderUserAndCategory(req, res, 'dashboard', 'My Dashboard Page', 'dashboard');
  //});

module.exports = router;
