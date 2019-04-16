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
    tenantId= Number(req.params.id)
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

const addNewTenant = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.password_digest);
  db.none("INSERT INTO users(name, dob, email, phone, password_digest, user_type) VALUES(${name},${dob}, ${email}, ${phone}, ${password_digest}, ${user_type})",
  {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    password_digest: hash,
    user_type: "tenant"
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
  db.none("UPDATE users SET name=${name}, dob=${dob}, email=${email}, phone=${phone}, password_digest=${password_digest}, user_type=${user_type} WHERE id=${id}",
  {
    id: req.params.id,
    name:req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    phone: req.body.phone,
    password_digest: req.body.password_digest, 
    user_type: "tenant"
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
  userT="tenant"
  tenantId = Number(req.params.id)
  console.log(tenantId, userT)
  db.result(`DELETE FROM users WHERE user_type= 'tenant' AND id=${tenantId}`, tenantId)
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
  getAllTenants: getAllTenants,
  getSingleTenant: getSingleTenant,
  addNewTenant: addNewTenant,
  updateTanant: updateTanant,
  deleteTanant: deleteTanant,
  logoutUser: logoutUser,
  loginUser: loginUser,
  isLoggedIn: isLoggedIn
}
