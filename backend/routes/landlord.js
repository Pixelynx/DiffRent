const express = require('express');
const router = express.Router();
const queries = require('../db/queries/landlords.js');

router.get('/', queries.getAllLandlords);
router.post('/', queries.addNewLandlord);
router.delete('/:id', queries.deleteLandlord);
router.put('/:id', queries.updateLandlord);

module.exports = router;
