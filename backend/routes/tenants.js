const express = require('express');
const router = express.Router();
const passport = require('../auth/local');
const { loginRequired } = require("../auth/helpers");
const queries = require('../db/queries/tenants.js');

router.get('/', queries.getAllTenants);
router.get('/:id', queries.getSingleTenant);
router.post('/', queries.addNewTenant);
router.delete('/:id', queries.deleteTanant);
router.put('/:id', queries.updateTanant);

router.post("/login", passport.authenticate("local", {}), queries.loginUser);



module.exports = router;
 
