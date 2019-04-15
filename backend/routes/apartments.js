const express = require('express');
const router = express.Router();
const queries = require('../db/queries/apartments');

router.get('/', queries.getAllApts);
router.get('/:id', queries.getSingleApt);
router.post('/', queries.addApt);
router.get('/:id/landlord/:idea', queries.getLandlordByApt);

module.exports = router;
