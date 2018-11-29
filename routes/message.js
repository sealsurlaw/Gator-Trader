var express = require("express");
var router = express.Router();
var db = require('../db');
var formidable = require('formidable');
var render = require('../models/loginCheck').renderUserAndCategory;
var id_user;
var id_item;

console.log("Hi1");
router.post('/', function(req,res,next){

console.log("Hi2");
console.log("User Session: "+ req.session.user_id);
id_user = req.session.user_id;
console.log(id_user);

if (req.session.user_id) {
  db.any(`SELECT * FROM item WHERE user_id =` + req.session.user_id )
  .then( data => db.any(`SELECT * from category`)
  .then( cats => {
    data.forEach(item => {
      cats.forEach(cat => {
        if (item.category_id == cat.category_id) {
          item.item_category = cat.category_name;
        }
      });
    });
    id_item = data.item_id;
    console.log(id_item);
    //render(req, res, 'dashboard', 'DASHBOARD PAGE','dashboard', {data: data});
  }));
}
else {
  req.session.nextPage = '/messageSent';
  res.redirect('/login');
}

  var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){

    db.any(
        `INSERT INTO gator_message(
          message_text,
          user_id,
          item_id
        )
        VALUES
        (
            '` + fields.text_message +`',
            ` + id_user + `,
            ` + id_item + `
        )`
    )
  .then(function(){
    res.redirect('./messageSent');
  })
  .catch(e =>{
    console.log("Message Error");
    console.log(e);
    render(req, res, 'search', 'SEARCH PAGE', 'search');
  });
  });
});

module.exports = router;
