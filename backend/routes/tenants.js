const express = require('express');
const router = express.Router();
const queries = require('../db/queries/tenants.js');

router.get('/', queries.getAllTenants);
router.get('/:id', queries.getSingleTenant);
router.post('/', queries.addNewTenant);
router.delete('/:id', queries.deleteTanant);
router.put('/:id', queries.updateTanant);


module.exports = router;
