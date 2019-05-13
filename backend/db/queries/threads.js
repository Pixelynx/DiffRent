const db = require('../../db/index.js');
const {addMsg} = require('./messages');

// addThread - Create a thread 
// getAllMsgsInThread - Gets all the messages for one thread
// getThreadsByUser- Gets all threads that a user is in 

// const addThread = (req, res, next) => {
//   db.one("INSERT INTO messages(tenant_id, landlord_id) VALUES(${tenant_id}, ${landlord_id})", req.body)
//   .then((thread) => {
//     console.log('THEN WITH A THRREAD', thread)
//     req.body.threads_id = thread.id 
//     addMsg(req, res, next)
//   })
//   .catch(err => next(err));
// };

const addThread = (req, res, next) => {
  db.one("INSERT INTO threads(title, tenant_id, landlord_id) VALUES( ${title}, ${tenant_id}, ${landlord_id}) RETURNING *", req.body)
  .then((thread) => {
    res.status(200).json({
      status: "Success",
      thread, 
      message: "Created thread"
    });
  })
  .catch(err => {
    return next(err);
  })
};
    
const getAllMsgsInThread = (req, res, next) => {
  let threadsId = parseInt(req.params.id)
  db.any("SELECT messages.*, users.name, users.user_type FROM messages JOIN threads ON messages.threads_id = threads.id JOIN users ON messages.owner_id = users.id WHERE threads.id=$1 ORDER BY message_date", threadsId)
  .then(messages => {
    res.status(200).json({
      status: "Success", 
      message: "Received all messages for thread " + threadsId,
      data: [...messages]
    });
  })
  .catch(err => {
    return next(err);
  })
};

const getThreadsByUser = (req, res, next) => {
  let tenant_id = parseInt(req.params.tenant_id)
  let landlord_id = parseInt(req.params.landlord_id)
  console.log(req.params)
  console.log(landlord_id, tenant_id)
  db.any("SELECT * FROM threads WHERE threads.tenant_id = $1 OR landlord_id = $2 ORDER BY id DESC", [tenant_id, landlord_id])
  .then(threads => {
    res.status(200).json({
      status: "Success",
      threads, 
      message: "Received all threads for thread " 
    });
  })
  .catch(err => {
    return next(err);
  })
};

module.exports = {
  addThread,
  getAllMsgsInThread,
  getThreadsByUser
}