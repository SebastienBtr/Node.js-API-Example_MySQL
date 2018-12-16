const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users.ctrl");

router.put("/users/create-user", usersCtrl.createUser);

router.get("/users/:id", usersCtrl.getUserById);

module.exports = router;