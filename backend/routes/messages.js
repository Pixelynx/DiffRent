const express = require('express');
const router = express.Router();

const {
  getAllMsgs,
  addMsg
} = require("../db/queries/messages");

router.get('/allmessages', getAllMsgs);
router.post('/newmessage', addMsg);

module.exports = router;

