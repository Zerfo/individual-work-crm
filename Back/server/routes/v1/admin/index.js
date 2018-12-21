const express = require('express');
const router = express.Router();
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');

const Claim = require('../../../../database/schemas/claim');
const Computer = require('../../../../database/schemas/computer');

const config = require('../../../config');
const searchUser = require('../../../helpers/searchUser');
const searchClaim = require('../../../helpers/searchClaim');
const searchComputer = require('../../../helpers/searchComputer');
const BadTokenRequest = require('../../../helpers/BadToken');

router.get('/info', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = await searchUser({ id: jwt.verify(token, config.secret).id });
  const claims = await searchClaim.userClaim({ id: jwt.verify(token, config.secret).id });
  const computer = await searchComputer.userComputer({ id: jwt.verify(token, config.secret).id });

  return res.status(200).send({
    status: 'Ok',
    code: '200',
    attributes: {
      accessToken: jwt.sign({ id: user.id, admin: user.admin }, config.secret),
      id: user.id,
      userRole: user.admin ? 'ADMIN' : 'USER',
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarURL: user.avatarURL
    },
    userClaims: claims !== 'Error' && claims.length !== 0 ? claims.map(item => ({
      statusClaim: item.statusClaim,
      nameClaim: item.nameClaim,
      descriptionClaim: item.descriptionClaim,
      commentsClaim: item.commentsClaim,
      resolveClaim: item.resolveClaim,
    })) : null,
    computer: computer.length !== 0 ? computer.map(item => ({
      specifications: JSON.parse(item.specifications),
      pictureURL: item.pictureURL,
      underRepair: item.underRepair,
      cabinetNumber: item.cabinetNumber
    })) : null
  });
});

router.post('/edit', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  let user = await searchUser({ id: jwt.verify(token, config.secret).id });

  if (user === 'Error') return res.status(404).send({
    'status': 'error',
    'code': '404',
    'message': 'this user was not found'
  });

  const keys = Object.keys(req.body);
  const data = {};
  keys.forEach(item => {
    data[`${item}`] = req.body[`${item}`];
  });
  await user.updateAttributes(data);
  user = await searchUser({ id: jwt.verify(token, config.secret).id });
  return res.status(200).send({
    status: 'Ok',
    code: '200',
    attributes: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarURL: user.avatarURL
    }
  });
});

router.get('/claims/all', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const claim = await searchClaim.getAllClaim();

  return res.status(200).send({
    status: 'Ok',
    code: '200',
    attributes: {
      claim
    }
  });
});

router.delete('claims/delete', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.post('/claims/new_comment', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];  
  const claim = await searchClaim.userClaim({
    userID: jwt.verify(token, config.secret).id,
    id: req.body.data.claimId
  });
  const comment = req.body.data.comment;

  const comments =  {
    'commentsClaim': JSON.parse(claim.commentsClaim).concat(comment)
  };

  await claim.updateAttributes(comments);
  claim = await searchClaim.userClaim({
    userID: jwt.verify(token, config.secret).id,
    id: req.body.data.claimId
  });

  return res.status(200).send({
    status: 'Ok',
    code: '200',
    attributes: {
      id: claim.id,
      statusClaim: claim.statusClaim,
      nameClaim: claim.nameClaim,
      descriptionClaim: claim.descriptionClaim,
      commentsClaim: JSON.parse(claim.commentsClaim),
      resolveClaim: claim.resolveClaim,
    }
  });
});

router.put('/claims/update', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('/computers/take_user', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.post('/computers/add',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.post('/computers/reset',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('/computers/all',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

module.exports = router;
