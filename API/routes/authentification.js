const express = require("express");
const router = express.Router();

const authentificationCtrl = require("../controllers/authentification.ctrl");

router.post("/auth/login", authentificationCtrl.login);

module.exports = router;