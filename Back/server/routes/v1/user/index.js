const express = require('express');
const router = express.Router();
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');

const Claim = require('../../../../database/schemas/claim');

const config = require('../../../config');
const searchUser = require('../../../helpers/searchUser');
const searchClaim = require('../../../helpers/searchClaim');
const searchComputer = require('../../../helpers/searchComputer');
const BadTokenRequest = require('../../../helpers/BadToken');

const createClaim = claimData => Claim.create({
  userID: claimData.userID,
  computerID: claimData.computerID ? claimData.computerID : '',
  statusClaim: 'new',
  nameClaim: claimData.name,
  descriptionClaim: claimData.descriptionClaim
});

router.get('/info', jwtMiddleware({ secret: config.secret }), BadTokenRequest,  async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = await searchUser({ id: jwt.verify(token, config.secret).id });
  const claims = await searchClaim.userClaim({ userID: jwt.verify(token, config.secret).id });
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
      id: item.id,
      statusClaim: item.statusClaim,
      nameClaim: item.nameClaim,
      descriptionClaim: item.descriptionClaim,
      commentsClaim: item.commentsClaim,
      resolveClaim: item.resolveClaim,
      createdAt: item.createdAt
    })).reverse() : null,
    computer: computer.length !== 0 ? computer[0] : null
  });
});

router.put('/edit', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
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

router.get('/claims', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const claims = await searchClaim.userClaim({ userID: jwt.verify(token, config.secret).id });
  if (claims !== 'Error') {
    return res.status(200).send({
      status: 'Ok',
      code: '200',
      data: {
        claims: claims.length !== 0 ? claims.map(item => item).reverse() : null
      }
    });
  } else {
    return res.status(404).send({
      status: 'Error',
      code: '404',
      message: "claims wasn't found"
    });
  }
});

router.get('/computer/my',  jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const computer = await searchComputer.userComputer({ userID: jwt.verify(token, config.secret).id });
  if (computer !== 'Error') {
    return res.status(200).send({
      status: 'Ok',
      code: '200',
      data: {
        computer: computer.length !== 0 ? computer[0] : null
      }
    })
  } else {
    return res.status(404).send({
      status: 'Error',
      code: '404',
      message: "Computer wasn't found"
    });
  }
});

router.post('/claims/add', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  Claim.sync()
  .then(() => {
    createClaim(req.body)
      .then(rez => res.status(200).send({
        'status': 'OK',
        'code': '200',
        'data': {
          'type': 'registration',
          'id': rez.id
        }
      }))
      .catch(err => res.status(404).send({
        err: err,
        'status': 'ERROR',
        'code': '404',
        'name': err.name,
        'errors': {
          'massage': err.errors[0],
          'type': err.errors[0],
          'origin': err.errors[0],
          'description': `Введен не уникальный ${err.errors[0]}`
          }
        }));
      });
    });

router.post('/claims/new_comment', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];  
  const claim = await searchClaim.userClaim({
    userID: jwt.verify(token, config.secret).id,
    id: req.body.data.claimId
  });
  const comment = req.body.data.comment;

  const comments =  {
    'commentsClaim': JSON.stringify(JSON.parse(claim.commentsClaim).concat(comment))
  };

  await claim.updateAttributes(comments);
  claim = await searchClaim.userClaim({
    userID: jwt.verify(token, config.secret).id,
    id: req.body.claimId
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
      createdAt: item.createdAt,
    }
  });
});

router.delete('/claim/close',  jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const claim = await searchClaim.claim({
    userID: jwt.verify(token, config.secret).id,
    id: req.body.claimId
  });
  const deleteClaim = {
    'status': 'close'
  };

  await claim.updateAttributes(deleteClaim);
  return res.status(200).send({
    status: 'Ok',
    code: '200',
    messege: 'This claim was closed'
  });
});

module.exports = router;
