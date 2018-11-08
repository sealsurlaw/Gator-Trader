var passwordHash = require('password-hash');

var db = require('../db');


function getUserIDFromCookies (req) {
    return req.signedCookies.id;
}

async function getUserFromDB (req) {
    var id = getUserIDFromCookies(req);
    return await db.any(`SELECT * FROM user_record WHERE user_id=` + id);
}

function verifyUser (res, user, fields) {
    if (user[0] && passwordHash.verify(fields.password,user[0].user_password)) {
        console.log("Login successful!");
        console.log(user);
        // req.session.user = user[0].user_id;
        res.cookie('id', user[0].user_id, { signed: true} ).redirect('/users');
    }
    else {
        console.log("Login failed!");
        res.render('register');
    }
}

module.exports.getUserIDFromCookies = getUserIDFromCookies;
module.exports.getLoggedInUserFromDB = getUserFromDB;
module.exports.verifyUser = verifyUser;