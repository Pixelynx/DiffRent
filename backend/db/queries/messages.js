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

const addMsg = (req, res, next) => {
  db.none("INSERT INTO messages(landlord_id, tenant_id, body) VALUES(${landlord_id}, ${tenant_id}, ${body})", req.body)
  .then(() => {
    res.status(200).json({
      status: "Success",
      message: "New message added"
    });
  })
  .catch(err => next(err));
};

module.exports = {
  getAllMsgs,
  addMsg
}