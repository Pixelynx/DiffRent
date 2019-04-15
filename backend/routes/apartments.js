const express = require('express');
const router = express.Router();
const queries = require('../db/queries/apartments');

router.get('/', queries.getAllApts);
router.get('/:id', queries.getSingleApt);
router.get('/:id/landlord/:id', queries.getLandlordByApt);
router.post('/', queries.addApt);

module.exports = router;
