const db = require('../db.js');
const bcrypt = require('bcrypt');

module.exports.create = (user, success, error) => {

    this.uniqueEmail(user.email, (unique) => {

        if (unique) {

            let query = 'INSERT INTO users (email, firstname, lastname, password) VALUES(?, ?, ?, ?)';

            bcrypt.hash(user.password, 10, function (err, hash) {

                if (!err) {
                    db.connection.query(query, [user.email, user.firstname, user.lastname, hash], (err, rows) => {

                        if (!err) {

                            success(rows);

                        } else {
                            error({ message: "ERRORS.DATABASE_ERROR", error: err, status: 500 });
                        }
                    });
                    
                } else {
                    error(err);
                }
            });

        } else {
            error({ message: "ERRORS.EMAIL_NOT_UNIQUE", status: 412 });
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
}



module.exports.findById = (id, success, error) => {

    let query = 'SELECT *, NULL AS password FROM users WHERE id = ?';

    db.connection.query(query, [id], (err, rows) => {

        if (!err) {

            if (rows.length > 0) {
                success(rows[0]);
            } else {
                error({ message: "ERRORS.NO_USER_FIND", status: 204 });
            }

        } else {
            error({ message: "ERRORS.DATABASE_ERROR", error: err, status: 500 });
        }
    });
};



module.exports.findByEmail = (email, success, error) => {

    let query = 'SELECT * FROM users WHERE email = ?';

    db.connection.query(query, [email], (err, rows) => {

        if (!err) {

            if (rows.length > 0) {
                success(rows[0]);
            } else {
                error({ message: "ERRORS.NO_USER_FIND", status: 204 });
            }

        } else {
            error({ message: "ERRORS.DATABASE_ERROR", error: err, status: 500 });
        }
    });
};


module.exports.deleteByEmail = (email, success, error) => {

    let query = "DELETE FROM users WHERE email = ?";

    db.connection.query(query, [email], (err, rows) => {

        if (!err) {
            success(rows);

        } else {
            error({ message: "ERRORS.DATABASE_ERROR", error: err, status: 500 });
        }
    });
};