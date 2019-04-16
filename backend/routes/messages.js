const express = require('express');
const router = express.Router();

const {
  getAllMsgs
} = require("../db/queries/messages");

router.get('/', getAllMsgs)

module.exports = router;
