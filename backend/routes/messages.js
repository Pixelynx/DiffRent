const express = require('express');
const router = express.Router();

const {
  addMsg
} = require("../db/queries/messages");

router.post('/newmessage', addMsg);

module.exports = router;

