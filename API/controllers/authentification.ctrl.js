const funct = require("../utils/commonFunctions.js");
const authSrv = require("../services/authentification.srv.js");

module.exports.login = (req, res) => {

    if (funct.checkParams(res, req.body.email, req.body.password)) {

        let email = req.body.email;
        let password = req.body.password;

        authSrv.checkEmailPassword(email, password, (user) => {

            authSrv.generateJWT(user.id, (token) => {

                res.status(200).send(token);

            }, (error) => {

                funct.errorFunct("authSrv.generateJWT", error, res);

            });

        }, (error) => {

            funct.errorFunct("authSrv.checkEmailPassword", error, res);

        });

    }

};