const express = require('express');
const router = express.Router();

const funct = require('../utils/commonFunctions.js');
const authSrv = require('../services/authentification.srv.js');

router.post('/login', (req, res) => {

    if (funct.checkParams(res, req.body.email, req.body.password)) {

        let email = req.body.email;
        let password = req.body.password

        authSrv.checkEmailPassword(email, password, (user) => {

            authSrv.generateJWT(user.id, (token) => {

                res.statusCode = 200;
                res.send(token);

            }, (error) => {
                funct.errorFunct("authSrv.generateJWT", error, res);
            });

        }, (error) => {
            funct.errorFunct("authSrv.checkEmailPassword", error, res);
        });
    }
});

module.exports = router;