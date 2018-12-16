const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const usersSrv = require("./users.srv.js");

module.exports.checkEmailPassword = (email, password, success, error) => {

    usersSrv.findByEmail(email, (user) => {

        bcrypt.compare(password, user.password, (err, res) => {

            if (res) {

                user.password = null;
                success(user);

            } else {

                error({ "message": "ERRORS.BAD_CREDENTIALS", "error": err, "status": 401 });

            }

        });

    }, (err) => {

        if (err.status === 204) {

            error({ "message": "ERRORS.BAD_CREDENTIALS", "error": err, "status": 401 });

        } else {

            error(err);

        }

    });

};

module.exports.generateJWT = (userId, success, error) => {

    const RSA_PRIVATE_KEY = fs.readFileSync(process.env.RSA_PRIVATE_KEY_PATH);

    let id = userId.toString();

    let token = jwt.sign({}, RSA_PRIVATE_KEY, {
        "algorithm": "RS256",
        "expiresIn": 120,
        "subject": id
    });

    let tokenObj = {
        "idToken": token,
        "expiresIn": 120
    };

    success(tokenObj);

};