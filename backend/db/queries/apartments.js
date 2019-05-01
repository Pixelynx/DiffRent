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

const getAvailableApts = (req, res, next) => {
  db.any("SELECT apartments.id AS aptid, apt, address, landlord_id, tenant_id, name, email, phone, user_type FROM apartments JOIN users ON (apartments.landlord_id = users.id) WHERE apartments.tenant_id IS NULL")
  .then(apartments => {
    res.status(200).json({
      status: "Success",
      data: apartments,
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

const getTenantByApt = (req, res, next) => {
  aptId = Number(req.params.id)
  db.one(`SELECT users.id, users.name, users.email, users.phone, users.dob FROM apartments
  JOIN users
  ON apartments.tenant_id = users.id
  WHERE apartments.id=$1 AND users.user_type='tenant'`, aptId)
  .then(apartment => {
    res.status(200)
      .json({
        status: "Success",
        apartment,
        message: "Receive Tenant info"
      })
  })
  .catch(err => {
    console.log('error:', err)
    next(err)
  })
}

const updateApartment = (req, res, next) => {
  id = Number(req.params.id)
  db.none("UPDATE apartments SET apt=${apt}, address=${address}, landlord_id=${landlord_id}, tenant_id=${tenant_id} WHERE apartments.id=${id}",
  {
    id: id,
    apt:req.body.apt,
    address: req.body.address,
    landlord_id: req.body.landlord_id,
    tenant_id: req.body.tenant_id
  })
    .then(() => {
    res.status(200)
       .json({
         status: "success",
         message: "Updated an apartment!"
       })
  })
  .catch(err => {
  console.log('error:', err)
  return next(err)
  })
}

module.exports = {
  getAllApts,
  getSingleApt,
  addApt,
  getLandlordByApt,
  getTenantByApt,
  getAvailableApts,
  updateApartment
}
