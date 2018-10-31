const express = require('express');
const router = express.Router();
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');
const searchUser = require('../../../helpers/searchUser');
const searchClaim = require('../../../helpers/searchClaim');
const BadTokenRequest = require('../../../helpers/BadToken');

router.get('/info', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = await searchUser({ id: jwt.verify(token, config.secret).id });
  //TODO: Вынести получение заявок пользователя в отдельнвый роут
  const claims = await searchClaim.userClaim({ id: jwt.verify(token, config.secret).id });

  return res.status(200).send({
    attributes: {
      id: user.id,
      userRole: user.admin ? 'ADMIN' : 'USER',
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarURL: user.avatarURL
    },
    UserClaims: claims !== 'Error' ? claims.map(item => ({
      statusClaim: item.statusClaim,
      nameClaim: item.nameClaim,
      descriptionClaim: item.descriptionClaim,
      commentsClaim: item.commentsClaim,
      resolveClaim: item.resolveClaim
    })) : null
  });
});

module.exports = router;
