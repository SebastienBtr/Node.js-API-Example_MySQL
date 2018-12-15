const express = require("express");
const router = express.Router();

const authRoutes = require("./authentification");
const usersRoutes = require("./users");

router.use([authRoutes, usersRoutes]);

module.exports = router;