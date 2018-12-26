const funct = require("../utils/commonFunctions.js");
const usersSrv = require("../services/users.srv.js");

module.exports.createUser = (req, res) => {

    if (funct.checkParams(res, req.body.user, req.body.user.email, req.body.user.firstname,
        req.body.user.lastname, req.body.user.password)) {

        let user = req.body.user;

        usersSrv.create(user, (rows) => {

            res.status(200).send(rows);

        }, (error) => {

            funct.errorFunct("usersSrv.create", error, res);

        });

    }

};

module.exports.getUserById = (req, res) => {

    if (funct.checkParams(res, req.params.id)) {

        let id = req.params.id;

        usersSrv.findById(id, (user) => {

            res.status(200).send(user);

        }, (error) => {

            funct.errorFunct("usersSrv.findById", error, res);

        });

    }

};