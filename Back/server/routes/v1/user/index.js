const express = require('express');
const router = express.Router();
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const searchUser = require('../../../helpers/searchUser');

router.get('/', jwtMiddleware({ secret: config.secret }), async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = await searchUser({ id: jwt.verify(token, config.secret).id });
  return res.status(200).send({
    id: user.id,
    userRole: user.admin ? 'ADMIN' : 'USER',
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarURL: user.avatarURL
  });
});

module.exports = router;
