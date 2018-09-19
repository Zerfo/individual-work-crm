/* @flow */
const { compareSync } = require('bcrypt');
const User = require('../../../../database/schemas/user');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');


module.exports = app => {
	app.post('/api/v1/login', async (req, res) => {
    const { login, password } = req.body;
    await User.sync();
    const user = await User.findOne({username: login});
    if (!user || !compareSync(password, user.password)) {
      const error = new Error;
      error.status = 403;
      throw error;
    }
    const refreshToken = uuid();
    await user.updateAttributes({ refreshToken });
    res.status(200).send({
      'status': 'Ok',
      'data': {
        'accessToken': jwt.sign({ id: user.id }, 'SUPERSECTER'),
        'refreshToken': refreshToken
      }
    }).type('json');
  });
};
