const jwt = require('jsonwebtoken');

const config = require('../config');

const roleAdmin = (req, res, next) => {
  const admin = jwt.verify(req.headers.authorization.split(' ')[1], config.secret).admin
  if (!admin) return res.status(503).send({
    status: 'error',
    code: 503,
    message: 'Access closed'
  });
  next();
};

const roleUser = (req, res, next) => {
  const user = jwt.verify(req.headers.authorization.split(' ')[1], config.secret).admin
  if (user) return res.status(503).send({
    status: 'error',
    code: 503,
    message: 'Access closed'
  });
  next();
};

module.exports = roleAdmin;
module.exports = roleUser;

module.exports = {
  roleAdmin,
  roleUser
};
