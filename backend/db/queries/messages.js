const db = require('../../db/index.js');

const getAllMsgs = (req, res, next) => {
  db.any("SELECT * FROM messages")
  .then(messages => {
    res.status(200).json({
      status: "Success",
      messages,
      message: "Received all messages"
    });
  })
  .catch(err => next(err));
};

module.exports = {
  getAllMsgs
}