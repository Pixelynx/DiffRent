const db = require('../../db/index.js');
const authHelpers = require("../../auth/helpers");

const getAllLandlords = (req, res, next) => {
  db.any(`SELECT * FROM landlords`)
  .then(data => {
      res.status(200)
         .json({
           status: 'Success',
           message: 'Received All Landlords',
           data: data
         })
    })
    .catch(err => {
      console.log('error:', err)
      next(err)
    })
}

const getSingleLandlord = (req, res, next) => {
  userId = Number(req.params.id)
  db.one(`Select * FROM landlords WHERE id=$1`, userId)
  .then(data => {
    res.status(200)
       .json({
         status: 'Success',
         message: 'Received Single Landlord',
         data: data
       })
  })
  .catch(err => {
    console.log('error:', err)
    next(err)
  })
}

const getAllAptsByLandlord = (req, res, next) => {
  landlord_id = Number(req.params.id)
  db.any(`SELECT  apartments.id AS apartment_id, apartments.address, tenants.name, tenants.email, tenants.phone FROM apartments
          JOIN tenants
          ON apartments.id = tenants.apartment_id
          WHERE apartments.landlord_id=$1`, landlord_id)
    .then(data => {
      res.status(200)
        .json({
          status: "Succuss",
          message: 'Received All apts for Landlord',
          data: data
        })
    })
    .catch(err => {
      console.log("error: ", err)
      next(err)
    })
}

const addNewLandlord = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password_digest);
  db.none("INSERT INTO landlords(name, email, phone, dob, password_digest) VALUES(${name}, ${email}, ${phone}, ${dob}, ${password_digest})",
  {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    password_digest: hash
  })
  .then(() => {
    res.status(200)
       .json({
         status: 'success',
         message: 'New Landlord Added'
       })
  })
  .catch(err => {
    console.log('error: ', err)
    return next(err)
  })
}

const updateLandlord = (req, res, next) => {
  userId = Number(req.params.id)
  db.none("UPDATE landlords SET name=${name}, email=${email}, phone=${phone}, dob=${dob}, password_digest=${password_digest} WHERE id=${id}",
  {
    id: req.params.id,
    name:req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    password_digest: req.body.password_digest
  })
    .then(() => {
    res.status(200)
       .json({
         status: "success",
         message: "Updated A Landlord!"
       })
  })
  .catch(err => {
  console.log('error:', err)
  return next(err)
  })
}

const deleteLandlord = (req, res, next) => {
  userId = Number(req.params.id)
  db.result(`DELETE FROM landlords WHERE id=$1`, userId)
    .then(result => {
      res.status(200)
         .json({
           status: 'Success!',
           message: 'Landlord has been Deleted'
         })
    })
    .catch(err => {
      console.log('Error: ', err)
      return next(err)
    })
}


const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send("log out success");
}

const loginUser = (req, res) => {
res.json(req.user);
}

const isLoggedIn = (req, res) => {
  if (req.user) {
      res.json({ username: req.user });
  } else {
      res.json({ username: null });
  }
}

module.exports = {
  getAllLandlords: getAllLandlords,
  getSingleLandlord: getSingleLandlord,
  getAllAptsByLandlord: getAllAptsByLandlord,
  addNewLandlord: addNewLandlord,
  updateLandlord: updateLandlord,
  deleteLandlord: deleteLandlord,
  logoutUser: logoutUser,
  loginUser: loginUser,
  isLoggedIn: isLoggedIn
}
