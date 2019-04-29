const db = require('../../db/index.js');

const getAllApts = (req, res, next) => {
  db.any("SELECT * FROM apartments")
  .then(apartments => {
    res.status(200).json({
      status: "Success",
      apartments,
      message: "Received all apartments"
    });
  })
  .catch(err => next(err));
};

const getSingleApt = (req, res, next) => {
  let aptId = parseInt(req.params.id);
  db.one("SELECT * FROM apartments WHERE id=$1", aptId)
  .then(apartment => {
    res.status(200).json({
      status: "Success",
      apartment,
      message: "Received one apartment"
    })
  })
  .catch(err => next(err));
}

const addApt = (req, res, next) => {
  db.none("INSERT INTO apartments(apt, address, landlord_id) VALUES(${apt}, ${address}, ${landlord_id})", 
  {apt: req.body.apt,
  address: req.body.address,
  landlord_id: req.body.landlord_id})
  .then(() => {
    res.status(200).json({
      status: "Success",
      message: "New apartment added"
    });
  })
  .catch(err => next(err));
}

const getLandlordByApt = (req, res, next) => {
  aptId = Number(req.params.id)
  db.one(`SELECT users.id, users.name, users.email, users.phone, users.dob FROM apartments
      JOIN users
      ON apartments.landlord_id = users.id
      WHERE apartments.id=$1`, aptId)
  .then(apartment => {
    res.status(200)
      .json({
        status: "Success",
        apartment,
        message: "Receive Landlords info"
      })
  })
  .catch(err => {
    console.log('error:', err)
    next(err)
  })
}

module.exports = {
  getAllApts,
  getSingleApt,
  addApt,
  getLandlordByApt
}
