var passwordHash = require('password-hash');

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
            renderUserAndCategory(req, res, 'login', 'LOGIN PAGE', 'login');
        })
    }
}

function renderUserAndCategory (req, res, page, title, stylesheet, options) {
    if (!options) var options = {};
    var user_id = getUserIDFromSession(req);
    var script;
    var data;
    if (options.script) script = options.script;
    if (options.data) data = options.data;

    db.any(`SELECT * FROM category`)
    .then( cat => {

        if (user_id) {
            db.any(`SELECT user_name FROM user_record WHERE user_id=` + user_id)
            .then( user => {
                var ops = {title: title, stylesheet: stylesheet, script: script, categories: cat, username: user[0].user_name, data: data};
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
    date = new Date(date);
    var year = 1900+date.getYear();
    var month = date.getMonth();
    var day = date.getDay();
    if (day < 10)
        day = '0'+day;
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (minute < 10)
        minute = '0'+minute;
    return month+"-"+day+"-"+year+" "+hour+":"+minute;
}

module.exports.getUserIDFromSession = getUserIDFromSession;
module.exports.loginUser = loginUser;
module.exports.renderUserAndCategory = renderUserAndCategory;
module.exports.formatDate = formatDate;
