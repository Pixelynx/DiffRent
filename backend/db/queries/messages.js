const db = require('../../db/index.js');

const addMsg = (req, res, next) => {
  req.body.message_date = Date.now()
  db.none("INSERT INTO messages(owner_id, body, message_date, threads_id) VALUES(${owner_id}, ${body}, ${message_date}, ${threads_id})", req.body)
  .then(() => {
    res.status(200).json({
      status: "Success",
      message: "New message added"
    });
  })
  .catch(err => next(err));
};

module.exports = {
  addMsg
}


/*
{
  landlord_id: 1,
  tenant_id: 4,
  owner_id: 4,
  body: "my pipes burst!!!",
} */