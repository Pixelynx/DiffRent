const db = require('../../db/index.js');

const getAllApts = (req, res, next) => {
  db.any("SELECT * FROM apartments")
  .then(apartments => {
    res.status(200).json({
      status: "Success",
      apartments, 
      message: "Received all apartments"
    });
  })
  .catch(err => next(err));
};

const getSingleApt = (req, res, next) => {
  let aptId = parseInt(req.params.id);
  db.one("SELECT * FROM apartments WHERE id=$1", aptId)
  .then(apartment => {
    res.status(200).json({
      status: "Success",
      apartment,
      message: "Received one apartment"
    })
  })
  .catch(err => next(err));
}

const addApt = (req, res, next) => {
  db.none("INSERT INTO apartments(name, address, landlord_id) VALUES(${name}, ${address}, ${landlord_id})", req.body)
  .then(() => {
    res.status(200).json({
      status: "Success",
      message: "New apartment added"
    });
  })
  .catch(err => next(err));
}

module.exports = {
  getAllApts,
  getSingleApt,
  addApt
}