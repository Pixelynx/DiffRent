const express = require('express');
const router = express.Router();
const passport = require('../auth/local');
const { loginRequired } = require("../auth/helpers");
const queries = require('../db/queries/users.js');

router.post("/isLoggedIn", queries.isLoggedIn);
router.post("/logout", loginRequired, queries.logoutUser);

module.exports = router;