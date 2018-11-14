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
    if (user[0] && passwordHash.verify(fields.UserPswd,user[0].user_password)) {
        console.log("Login successful!");
        console.log(user);
        res.cookie('id', user[0].user_id, { signed: true} ).redirect('/search?search=');
    }
    else {
        db.any(`SELECT * FROM category`)
        .then(cat => {
            console.log("Login failed!");
            res.render('LoginPage', {title:'LOGIN PAGE',stylesheet:'LoginPage', categories: cat, message: "Incorrect Login"});
        })
    }
}

module.exports.getUserIDFromCookies = getUserIDFromCookies;
module.exports.getLoggedInUserFromDB = getUserFromDB;
module.exports.loginUser = loginUser;
