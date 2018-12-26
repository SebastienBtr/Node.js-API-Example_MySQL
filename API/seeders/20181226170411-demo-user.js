"use strict";

module.exports = {

    //Password = test

    "up": (queryInterface, Sequelize) =>
        queryInterface.bulkInsert("Users", [{
            "firstName": "Jean",
            "lastName": "Dupont",
            "email": "myuser@test.fr",
            "password": "$2b$10$hpQ4XGtsArdwZkKy/BfTq.LscrM1/tVavwn5v9Cd7sQJ72dYyqU/W"
        }], {})
    ,

    "down": (queryInterface, Sequelize) => queryInterface.bulkDelete("Users", null, {})
};
