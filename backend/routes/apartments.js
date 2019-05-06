const express = require('express');
const router = express.Router();
const queries = require('../db/queries/apartments');

router.get('/', queries.getAllApts);
router.get('/available', queries.getAvailableApts);
router.get('/:id', queries.getSingleApt);
router.put('/:id', queries.updateApartment);
router.post('/', queries.addApt);
router.get('/landlord/:id', queries.getLandlordByApt);
router.get('/tenant/:id', queries.getTenantByApt, queries.getSingleApt);

module.exports = router;
