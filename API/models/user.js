"use strict";

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        "email": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "unique": true
        },
        "password": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "firstname": DataTypes.STRING,
        "lastname": DataTypes.STRING
    }, {});

    User.associate = function (models) {
    // Associations can be defined here
    };

    return User;

};