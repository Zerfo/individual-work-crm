const express = require('express');
const router = express.Router();  
const { compareSync } = require('bcrypt');
const User = require('../../../../database/schemas/user');
const config = require('../../../config');
const searchUser = require('../../../helpers/searchUser');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const jwtMiddleware = require('express-jwt');
const { hashSync } = require('bcrypt');

const createUser = userData => User.create({
  admin: userData.secretKey ? true : false,
  email: userData.email,
  username: userData.username,
  password: hashSync(userData.password, 10)
});

router.post('/singup', (req, res) => {
  User.sync()
  .then(() => {
    createUser(req.body)
      .then(rez => res.status(200).send({
        'status': 'OK',
        'code': '200',
        'data': {
          'type': 'registration',
          'id': rez.id
        }
      }))
      .catch(err => res.status(404).send({
        'status': 'ERROR',
        'code': '404',
        'name': err.name,
        'errors': {
          'massage': err.errors[0].message,
          'type': err.errors[0].type,
          'origin': err.errors[0].origin,
          'description': `Введен не уникальный ${err.errors[0].path}`
          }
        }));
      });
    });

router.post('/login', async (req, res) => {
  const { login, password } = req.body.data;
  if (!login || !password) return res.status(404).send({
    'status': 'error',
    'code': '404',
    'message': "user wasn't found"
  });
  const user = await searchUser({ username: login });
  if (user === 'Error' || !compareSync(password, user.password)) {
    return res.status(404).send({
      'status': 'error',
      'code': '404',
      'message': "user wasn't found"
    });
  }
  const refreshToken = uuid();
  await user.updateAttributes({ refreshToken });
  return res.status(200).send({
    'status': 'Ok',
    'code': '200',
    'data': {
      'accessToken': jwt.sign({ id: user.id }, config.secret),
      'refreshToken': refreshToken,
      'id': user.id,
      'tyle': 'profile',
      'attributes': {
        'username': user.username,
        'avatarURL': user.avatarURL,
        'userRole': user.admin ? 'ADMIN' : 'USER'
      }
    }
  });
});

router.post('/logout', jwtMiddleware({ secret: config.secret }), async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  if (!id) {
    return res.status(404).send({
      'status': 'error',
      'code': '404',
      'message': 'user was not found'
    });
  }
  const user = await searchUser({ id });
  if (user === 'Error') {
    return res.status(404).send({
      'status': 'error',
      'code': '404',
      'message': "user wasn't found"
    });
  };
  await user.updateAttributes({ 'refreshToken': 'null' });
  return res.status(200).send({ 'status': 'Ok' });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  const user = await searchUser({ refreshToken });
  if (user === 'Error' || !req.body.refreshToken) return res.status(404).send({
      'status': 'error',
      'code': '404',
      'message': 'Refresh token was not found'
    });
  const newRefreshToken = uuid();
  await user.updateAttributes({ 'refreshToken': newRefreshToken });
  return res.status(200).send({
    'status': 'Ok',
    'code': '200',
    'data': {
      'accessToken': jwt.sign({ id: user.id }, config.secret),
      'refreshToken': newRefreshToken
    }
  });
});

module.exports = router;
