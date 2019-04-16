const db = require('../../db/index.js');

const logoutUser = (req, res, next) => {
    req.logout();
    res.status(200).send("log out success");
  }

const isLoggedIn = (req, res) => {
    if (req.user) {
        res.json({ username: req.user });
    } else {
        res.json({ username: null });
    }
}

module.exports = {
    logoutUser: logoutUser,
    isLoggedIn: isLoggedIn
  }