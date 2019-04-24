const db = require('../../db/index.js');
const authHelpers = require("../../auth/helpers");

const getSingleUser = (req, res, next) => {
    userid= req.params.id;
  db.one("SELECT id, name, email, phone, user_type FROM users WHERE users.email = $1", userid)
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
  db.one("SELECT users.id AS userId, name, email, phone, dob, user_type, apartments.id AS aptId, apt, address, tenant_id, landlord_id, COUNT(tickets.id) AS openTickets FROM users JOIN apartments ON (users.id = apartments.landlord_id OR users.id = apartments.tenant_id) JOIN tickets ON (apartments.id = tickets.apartment_id AND (completed_landlord='0' OR completed_tenant='0')) WHERE users.email=$1 GROUP BY (users.id, apartments.id)", userId)
    .then(data => {
      res.status(200)
         .json({
           status: "Success",
           data: data,
           message: "Received Single User with apartment info"
         })
    })
    .catch(err => {
      console.log("error: ", err)
      next(err)
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
    logoutUser: logoutUser,
    isLoggedIn: isLoggedIn
  }
