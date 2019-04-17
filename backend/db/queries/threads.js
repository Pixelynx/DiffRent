const db = require('../../db/index.js');
import {addMsg} from '../queries/messages'

// addThread - Create a thread 
// getAllMsgsInThread - Gets all the messages for one thread
// getThreadsByUser- Gets all threads that a user is in 

const addThread = (req, res, next) => {
  db.one("INSERT INTO messages(tenant_id, landlord_id) VALUES(${tenant_id}, ${landlord_id})", req.body)
  .then((thread) => {
    req.body.threads_id = thread.id 
    addMsg(req, res, next)
  })
  .catch(err => next(err));
};

const getAllMsgsInThread = (req, res, next) => {
  let threadsId = parseInt(req.params.id)
  db.any("SELECT * FROM messages JOIN threads ON messages.threads_id = threads.id WHERE threads.id=$1", threadsId)
  .then(messages => {
    res.status(200).json({
      status: "Succes",
      messages, 
      message: "Received all messages for thread " + threadsId
    });
  })
  .catch(err => {
    return next(err);
  })
};

const getThreadsByUser = (req, res, next) => {
  let userId = parseInt(req.params.id)
  db.any("SELECT * FROM threads WHERE threads.tenant_id = $1 OR landlord_id = $1", userId)
  .then(threads => {
    res.status(200).json({
      status: "Succes",
      threads, 
      message: "Received all threads for thread " + userId
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