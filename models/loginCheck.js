var passwordHash = require('password-hash');

var db = require('../db');


function getUserIDFromCookies (req) {
    return req.signedCookies.id;
}

async function getUserFromDB (req) {
    var id = getUserIDFromCookies(req);
    return await db.any(`SELECT * FROM user_record WHERE user_id=` + id);
}

function loginUser (res, user, fields) {
    if (user[0] && passwordHash.verify(fields.password, user[0].user_password)) {
        console.log("Login successful!");
        console.log(user);
        res.cookie('id', user[0].user_id, { signed: true} ).redirect('/search?search=');
    }
    else {
        db.any(`SELECT * FROM category`)
        .then(cat => {
            console.log("Login failed!");
            res.render('login', {title:'LOGIN PAGE',stylesheet:'login', categories: cat, message: "Incorrect Login"});
        })
    }
}

function renderUserAndCategory (req, res, page, title, stylesheet) {
    var user_id = req.signedCookies.id;

    db.any(`SELECT * FROM category`)
    .then( cat => {

        if (user_id) {
            console.log(user_id);
            db.any(`SELECT user_name FROM user_record WHERE user_id=` + user_id)
            .then( user => {
                res.render(page, {title: title, stylesheet: stylesheet, categories: cat, username: user[0].user_name})
            });
        }
        else {
            console.log(user_id);

            res.render(page, {title: title, stylesheet: stylesheet, categories: cat});
        }

    });

}

function renderUserAndCategory (req, res, page, title, stylesheet, script) {
    var user_id = req.signedCookies.id;

    db.any(`SELECT * FROM category`)
    .then( cat => {

        if (user_id) {
            console.log(user_id);
            db.any(`SELECT user_name FROM user_record WHERE user_id=` + user_id)
            .then( user => {
                res.render(page, {title: title, stylesheet: stylesheet, script: script, categories: cat, username: user[0].user_name})
            });
        }
        else {
            console.log(user_id);

            res.render(page, {title: title, stylesheet: stylesheet, script: script, categories: cat});
        }

    });

}

function renderUserAndCategory (req, res, page, title, stylesheet, script, data) {
    var user_id = req.signedCookies.id;

    db.any(`SELECT * FROM category`)
    .then( cat => {

        if (user_id) {
            console.log(user_id);
            db.any(`SELECT user_name FROM user_record WHERE user_id=` + user_id)
            .then( user => {
                res.render(page, {title: title, stylesheet: stylesheet, script: script, categories: cat, username: user[0].user_name, data: data})
            });
        }
        else {
            console.log(user_id);

            res.render(page, {title: title, stylesheet: stylesheet, script: script, categories: cat, data: data});
        }

    });

}

module.exports.getUserIDFromCookies = getUserIDFromCookies;
module.exports.getLoggedInUserFromDB = getUserFromDB;
module.exports.loginUser = loginUser;
module.exports.renderUserAndCategory = renderUserAndCategory;
