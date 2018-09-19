/* @flow */
const User = require('../../../../database/schemas/user');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

module.exports = app => {
	app.post('/api/v1/refresh', async (req, res) => {
    await User.sync();
    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshToken });
    if (!user || !req.body.refreshToken) {
      res.status(404).send({
        'code': '404',
        'status': 'ERROR',
        'message': 'Token was not found'
      }).type('json');
    };
    const newRefreshToken = uuid();
    await user.updateAttributes({ 'refreshToken': newRefreshToken });
    res.status(200).send({
      'status': 'Ok',
      'data': {
        'accessToken': jwt.sign({ id: user.id }, 'SUPERSECTER'),
        'refreshToken': newRefreshToken
      }
    }).type('json');
  });
};
