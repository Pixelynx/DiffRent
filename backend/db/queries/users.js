const db = require('../../db/index.js');
const authHelpers = require("../../auth/helpers");

const getSingleUser = (req, res, next) => {
    userid= req.params.id;
  db.one("SELECT users.id AS userId, name, email, phone, dob, password_digest,  user_type FROM users WHERE users.email = $1", userid)
    .then(data => {
      res.status(200)
         .json({
           status: "Success",
           data: data,
           message: "Received Single User"
         })
    })
    .catch(err => {
      console.log("error: ", err)
      next(err)
    })
}
const getUserAptInfo = (req, res, next) => {
    userId= req.params.id;
  db.one("SELECT users.id AS userid, name, email, phone, dob, USER_type, apartments.id AS aptid, apt, address, landlord_id, tenant_id FROM users JOIN apartments ON (users.id=apartments.landlord_id OR users.id = apartments.tenant_id) WHERE users.email=$1", userId)
    .then(data => {
      res.status(200)
         .json({
           status: "Success",
           data: data,
           message: "Received Single User with apartment info"
         })
    })
    .catch(err => {
      next()
      console.log("error: ", err)
    })
}

const updateUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password_digest);
  db.none(`UPDATE users SET name=$[name], email=$[email],
     phone=$[phone], dob=$[dob], password_digest=$[password_digest],
     user_type=$[user_type] WHERE users.id=$[id]`,
  {
    id: req.params.id,
    name:req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    password_digest: hash,
    user_type: req.body.user_type
  })
    .then(() => {
    res.status(200)
       .json({
         status: "success",
         message: "Updated a User!"
       })
  })
  .catch(err => {
  console.log('error:', err)
  return next(err)
  })
}

const addNewUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password_digest);
  db.none("INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES(${name}, ${email}, ${phone}, ${dob}, ${password_digest}, ${user_type})",
  {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.date,
    password_digest: hash,
    user_type: req.body.user_type
  })
  .then(() => {
    res.status(200)
       .json({
         status: 'success',
         message: 'New user Added'
       })
  })
  .catch(err => {
    console.log('error: ', err)
    return next(err)
  })
}

const logoutUser = (req, res, next) => {
    req.logout();
    res.status(200).send("log out success");
  }

const isLoggedIn = (req, res) => {
    if (req.user) {
        res.json({ username: req.user });
    } else {
        res.json({ username: null });
    }
}


module.exports = {
    getSingleUser: getSingleUser,
    getUserAptInfo: getUserAptInfo,
    addNewUser: addNewUser,
    updateUser: updateUser,
    logoutUser: logoutUser,
    isLoggedIn: isLoggedIn
  }
