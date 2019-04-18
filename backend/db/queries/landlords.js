const db = require('../../db/index.js');
const authHelpers = require("../../auth/helpers");

const getAllLandlords = (req, res, next) => {
  db.any(`SELECT * FROM users
        WHERE user_type = 'landlord'`)
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
  db.one(`SELECT name, email, phone, dob, password_digest, user_type, apartments.id AS apartmentId, apt, address, landlord_id FROM users JOIN apartments ON (users.id=apartments.landlord_id) WHERE apartments.landlord_id=$1
          `, userId)
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
  db.any(`SELECT  apartments.id AS apartment_id, apartments.address, apartments.apt, users.name, users.email, users.phone FROM apartments
          JOIN users
          ON apartments.tenant_id = users.id
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
  db.none("INSERT INTO users(name, email, phone, dob, password_digest, user_type) VALUES(${name}, ${email}, ${phone}, ${dob}, ${password_digest}, ${user_type})",
  {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    password_digest: hash,
    user_type: "landlord"
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
  db.none("UPDATE users SET name=${name}, email=${email}, phone=${phone}, dob=${dob}, password_digest=${password_digest}, user_type=${user_type} WHERE id=${id}",
  {
    id: req.params.id,
    name:req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    password_digest: req.body.password_digest,
    user_type: "landlord"
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
  db.result(`DELETE FROM users WHERE id=${userId} AND user_type = 'landlord'
`, userId)
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

const loginUser = (req, res) => {
res.json(req.user);
} 

module.exports = {
  getAllLandlords: getAllLandlords,
  getSingleLandlord: getSingleLandlord,
  getAllAptsByLandlord: getAllAptsByLandlord,
  addNewLandlord: addNewLandlord,
  updateLandlord: updateLandlord,
  deleteLandlord: deleteLandlord,
  loginUser: loginUser,
}
