var passwordHash = require('password-hash');
var url = require('url');

var db = require('../db');


function getUserIDFromSession (req) {
    return req.session.user_id;
}

function loginUser (req, res, user, fields) {
    if (user[0] && passwordHash.verify(fields.password, user[0].user_password)) {
        console.log("Login successful!");
        req.session.user_id = user[0].user_id;
        if (req.session.nextPage) {
            res.redirect(req.session.nextPage);
        }
        else {
            res.redirect('/search?search=');
        }
    }
    else {
        db.any(`SELECT * FROM category`)
        .then(cat => {
            console.log("Login failed!");
            renderUserAndCategory(req, res, 'login', 'LOGIN PAGE', 'login', {message: "Incorrect email or password"});
        })
    }
}

function renderUserAndCategory (req, res, page, title, stylesheet, options) {
    var q = url.parse(req.url, true).query;
    var category = q.category;

    if (!options) var options = {};
    var user_id = req.session.user_id;
    var script;
    var data;
    if (options.script) script = options.script;
    if (options.data) data = options.data;

    db.any(`SELECT * FROM category ORDER BY category_name ASC`)
    .then( cat => {
        if (category == -1 || !category) cat.all = true;
        cat.forEach(element => {
            if (element.category_id == category) element.selected = true;
        });

        if (user_id) {
            db.any(`SELECT user_name, admin_right FROM user_record WHERE user_id=` + user_id)
            .then( user => {
                var ops = {title: title, stylesheet: stylesheet, script: script, categories: cat, isAdmin: user[0].admin_right, username: user[0].user_name, data: data};
                res.render(page, ops);
            })
            .catch( err => {
                res.redirect('/clear');
                return;
            });
        }
        else {
            var ops = {title: title, stylesheet: stylesheet, script: script, categories: cat, data: data};
            res.render(page, ops);
        }

    });

}

function formatDate (date) {
    let month = 1+date.getMonth();
      let day = date.getDate();
      let year = 1900+date.getYear();
      let hour = date.getHours();
      let ampm;
      if (hour == 0) {
        hour += 12;
         ampm = "am";
      }
      else if (hour > 12) {
        hour -= 12;
        ampm = "pm";
      }
      else if (hour == 12) {
        ampm = "pm";
      }
      else {
        ampm = "am";
      }
      let minute = date.getMinutes();
      if (minute < 10) minute = "0"+minute;
      return month+"-"+day+"-"+year+"<br>"+hour+":"+minute+ampm;
}

module.exports.getUserIDFromSession = getUserIDFromSession;
module.exports.loginUser = loginUser;
module.exports.renderUserAndCategory = renderUserAndCategory;
module.exports.formatDate = formatDate;
