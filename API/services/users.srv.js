const bcrypt = require("bcrypt");

const models = require( "../models");
const User = models.user;

module.exports.create = (user, success, error) => {

    this.uniqueEmail(user.email, (unique) => {

        if (unique) {

            bcrypt.hash(user.password, 10, (err, hash) => {

                if (!err) {

                    User.create({
                        "email": user.email,
                        "fistname": user.firstname,
                        "lastname": user.lastname,
                        "password": hash

                    }).then((result) => {

                        success({ "insertId": result.id });

                    }).catch((err) => {

                        error({ "message": "ERRORS.DATABASE_ERROR", "error": err, "status": 500 });

                    });

                } else {

                    error(err);

                }

            });

        } else {

            error({ "message": "ERRORS.EMAIL_NOT_UNIQUE", "status": 412 });

        }

    }, (err) => {

        error(err);

    });

};

module.exports.uniqueEmail = (email, sucess, error) => {

    this.findByEmail(email, (user) => {

        sucess(false);

    }, (err) => {

        if (err.status === 204) {

            sucess(true);

        } else {

            error(err);

        }

    });

};

module.exports.findById = (id, success, error) => {

    User.findByPk(id).then((user) => {

        if (user) {

            success(user);

        } else {

            error({ "message": "ERRORS.NO_USER_FIND", "status": 204 });

        }

    }).catch((err) => {

        error({ "message": "ERRORS.DATABASE_ERROR", "error": err, "status": 500 });

    });

};

module.exports.findByEmail = (email, success, error) => {

    User.findOne({ "where": { "email": email } }).then((user) => {

        if (user) {

            success(user);

        } else {

            error({ "message": "ERRORS.NO_USER_FIND", "status": 204 });

        }

    }).catch((err) => {

        error({ "message": "ERRORS.DATABASE_ERROR", "error": err, "status": 500 });

    });

};

module.exports.deleteByEmail = (email, success, error) => {

    User.destroy({ "where": { "email": email } }).then((result) => {

        success();

    }).catch((err) => {

        error({ "message": "ERRORS.DATABASE_ERROR", "error": err, "status": 500 });

    });

};