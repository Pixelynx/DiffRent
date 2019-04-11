const express = require('express');
const router = express.Router();
const passport = require('../auth/tenantLocal');
const { loginRequired } = require("../auth/helpers");
const queries = require('../db/queries/tenants.js');

router.get('/', queries.getAllTenants);
router.get('/:id', queries.getSingleTenant);
router.post('/', queries.addNewTenant);
router.delete('/:id', queries.deleteTanant);
router.put('/:id', queries.updateTanant);

router.post("/login", passport.authenticate("local", {}), queries.loginUser);
router.post("/isLoggedIn", queries.isLoggedIn);
router.post("/logout", loginRequired, queries.logoutUser);


module.exports = router;
