const express = require('express');
const router = express.Router();
const passport = require('../auth/local');
const { loginRequired } = require("../auth/helpers");
const queries = require('../db/queries/landlords.js');

router.get('/', queries.getAllLandlords);
router.get('/:id', queries.getSingleLandlord);
router.get('/:id/apartments', queries.getAllAptsByLandlord);

router.post('/', queries.addNewLandlord);
router.delete('/:id', queries.deleteLandlord);
router.put('/:id', queries.updateLandlord);

router.post("/login", passport.authenticate("local", {}), queries.loginUser);
router.post("/isLoggedIn", queries.isLoggedIn);
router.post("/logout", loginRequired, queries.logoutUser);


module.exports = router;
