const express = require('express');
const router = express.Router();

const {
  addThread,
  getAllMsgsInThread,
  getThreadsByUser
} = require("../db/queries/threads");

router.post('/newthread/', addThread)
router.get('/msgsinthread', getAllMsgsInThread)
router.get('/threadsbyuser', getThreadsByUser)

module.exports = router;
