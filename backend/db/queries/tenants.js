const db = require('../../db/index.js');

const getAllTenants = (req, res, next) => {
  db.any("Select * from tenants")
  .then(data => {
      res.status(200)
         .json({
           status: 'Success',
           message: 'Received All Tenants',
           data: data
         })
    })
    .catch(err => {
      console.log('error:', err)
      next(err)
    })
}

const getSingleTenant = (req, res, next) => {
    tenantId= Number(req.params.id)
  db.one("SELECT * from tenants WHERE id=$1", tenantId)
    .then(data => {
      res.status(200)
         .json({
           status: "Success",
           message: "Received Single Tenant",
           data: data
         })
    })
    .catch(err => {
      console.log("error: ", err)
      next(err)
    })
}

const addNewTenant = (req, res, next) => {
  db.none("INSERT INTO tenants(name, dob, email, phone, apartment_id, password_digest) VALUES(${name},${dob}, ${email}, ${phone}, ${apartment_id}, ${password_digest})",
  {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    apartment_id: req.body.apartment_id,
    password_digest: req.body.password_digest
  })
  .then(() => {
    res.status(200)
       .json({
         status: 'success',
         message: 'New Tenant Added'
       })
  })
  .catch(err => {
    console.log('error: ', err)
    return next(err)
  })
}

const updateTanant = (req, res, next) => {
  tenantId= Number(req.params.id)
  db.none("UPDATE tenants SET name=${name}, dob=${dob}, email=${email}, phone=${phone}, apartment_id=${apartment_id}, password_digest=${password_digest} WHERE id=${id}",
  {
    id: req.params.id,
    name:req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    apartment_id: req.body.apartment_id,
    password_digest: req.body.password_digest
  })
    .then(() => {
    res.status(200)
       .json({
         status: "success",
         message: "Updated A Tenant!"
       })
  })
  .catch(err => {
  console.log('error:', err)
  return next(err)
  })
}

const deleteTanant = (req, res, next) => {
  tenantId = Number(req.params.id)
  db.result('DELETE from tenants WHERE id=$1', tenantId)
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

module.exports = {
  getAllTenants: getAllTenants,
  getSingleTenant: getSingleTenant,
  addNewTenant: addNewTenant,
  updateTanant: updateTanant,
  deleteTanant: deleteTanant
}
