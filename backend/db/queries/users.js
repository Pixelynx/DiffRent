const db = require('../../db/index.js');

const getSingleUser = (req, res, next) => {
    email= req.params.id;
  db.one("SELECT users.id AS userId, name, email, phone, dob, user_type, apartments.id AS aptId, apt, address, tenant_id, COUNT(tickets.id) AS openTickets FROM users JOIN apartments ON (users.id = apartments.landlord_id OR users.id = apartments.tenant_id) JOIN tickets ON (apartments.id = tickets.apartment_id AND (completed_landlord='0' OR completed_tenant='0')) WHERE users.email=$1 GROUP BY (users.id, apartments.id)", email)
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
    logoutUser: logoutUser,
    isLoggedIn: isLoggedIn
  }