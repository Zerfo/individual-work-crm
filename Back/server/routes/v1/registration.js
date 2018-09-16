/* @flow */
const crypto = require('crypto');
const User = require('../../../database/schemas/user');

const hash = text => crypto.createHash('sha1').update(text).digest('base64');
const createUser = userData => User.create({
  admin: userData.secretKey ? true : false,
  email: userData.email,
  username: userData.username,
  password: hash(userData.password)
});

module.exports = app => {
	app.post('/api/v1/registration', (req, res) => {
    User.sync()
    .then(() => {
      createUser(req.body)
        .then(rez => res.send({
          'status': 'OK',
          'data': {
            'type': 'registration',
            'id': rez.id
          }
        }).type('json'))
        .catch(err => res.send({
          'status': 'ERROR',
          'name': err.name,
          'errors': {
            'massage': err.errors[0].message,
            'type': err.errors[0].type,
            'origin': err.errors[0].origin,
            'description': `Введен не уникальный ${err.errors[0].path}`
            }
          }).type('json'));
        });
      });
    };
