const bcrypt = require('bcryptjs')

const comparePass = (userPass, databasePass) => {
    return bcrypt.compareSync(userPass, databasePass);
}

const createHash = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const loginRequired = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ status: "Forbidden - please log in." });
        return;
      }
      next();
}

module.exports = { comparePass, createHash, loginRequired }