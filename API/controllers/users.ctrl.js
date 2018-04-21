const express = require('express');
const router = express.Router();

const funct = require('../utils/commonFunctions.js');
const usersSrv = require('../services/users.srv.js');

router.put('/create-user', (req, res) => {

    if (funct.checkParams(res, req.body.user, req.body.user.email, req.body.user.firstname, 
        req.body.user.lastname, req.body.user.password)) {

        let user = req.body.user;

        usersSrv.create(user, (rows) => {
            res.statusCode = 200;
            res.send(rows);

        }, (error) => {
            funct.errorFunct("usersSrv.create", error, res);
        });
    }
});

router.get('/users/:id', (req, res) => {

    if (funct.checkParams(res, req.params.id)) {

        let id = req.params.id;

        usersSrv.findById(id, (user) => {
            res.statusCode = 200;
            res.send(user);

        }, (error) => {
            funct.errorFunct("usersSrv.findById", error, res);
        });
    }
});

module.exports = router;