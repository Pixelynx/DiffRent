const db = require('../../db/index.js');
const authHelpers = require("../../auth/helpers");

const getAllTenants = (req, res, next) => {
  db.any("SELECT * FROM users JOIN apartments ON (users.id=apartments.tenant_id)")
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
  tenantId = Number(req.params.id)
  db.one("SELECT name, email, phone, dob, password_digest, user_type, apartments.id AS apartmentId, apt, address, landlord_id FROM users JOIN apartments ON (users.id=apartments.tenant_id) WHERE apartments.tenant_id=$1", tenantId)
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

const updateTenant = (req, res, next) => {
  userId = Number(req.params.id)
  const hash = authHelpers.createHash(req.body.password_digest);
  db.none("UPDATE users SET name=${name}, email=${email}, phone=${phone}, dob=${dob}, password_digest=${password_digest}, user_type=${user_type} WHERE id=${id}",
    {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      password_digest: hash,
      user_type: "tenant"
    })
    .then(() => {
      res.status(200)
        .json({
          status: "success",
          message: "Updated a tenant!"
        })
    })
    .catch(err => {
      console.log('error:', err)
      return next(err)
    })
}



const deleteTenant = (req, res, next) => {
  userT = "tenant"
  tenantId = Number(req.params.id)
  console.log(tenantId, userT)
  db.result(`DELETE FROM users WHERE user_type= 'tenant' AND id=${tenantId}`, tenantId)
    .then(result => {
      res.status(200)
        .json({
          status: 'Success!',
          message: 'Tenant has been Deleted'
        })
    })
    .catch(err => {
      console.log('Error: ', err)
      return next(err)
    })
}


const loginUser = (req, res) => {
  console.log(req.user)
  res.json(req.user);
}

module.exports = {
  getAllTenants: getAllTenants,
  getSingleTenant: getSingleTenant,
  updateTenant: updateTenant,
  deleteTenant: deleteTenant,
  loginUser: loginUser
}
