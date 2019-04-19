const db = require('../../db/index.js');

const addMsg = (req, res, next) => {
  console.log('ADD MESSAGE BODY', req.body)
  db.one("INSERT INTO messages(owner_id, body, threads_id) VALUES(${owner_id}, ${body}, ${threads_id})", {
    owner_id: Number(req.body.owner_id),
    threads_id: Number(req.body.threads_id),
    body: req.body.body,
    // message_date: new Date()
  })
  .then((newMessage) => {
    res.status(200).json({
      status: "Success",
      newMessage,
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