const express = require('express');
const router = express.Router();
const passport = require('../auth/local');
const { loginRequired } = require("../auth/helpers");
const queries = require('../db/queries/users.js');

router.get("/:id", queries.getUserAptInfo, queries.getSingleUser)
router.get("/user/:id", queries.getSingleUser)
router.put("/:id", queries.updateUser)
router.post("/", queries.addNewUser)
router.post("/isLoggedIn", queries.isLoggedIn);
router.post("/logout", loginRequired, queries.logoutUser);

module.exports = router;
