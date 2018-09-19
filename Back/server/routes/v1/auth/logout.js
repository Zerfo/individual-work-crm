/* @flow */
const User = require('../../../../database/schemas/user');
const jwtMiddleware = require('express-jwt');

module.exports = app => {
	app.post('/api/v1/logout', jwtMiddleware({ secret: 'SUPERSECTER' }), async (req, res) => {
    await User.sync();
    const { id } = req.body;
    const user = await User.findOne({ id });
    if (!user) {
      res.status(404).send({
        'code': '404',
        'status': 'ERROR',
        'message': 'User was not found'
      }).type('json');
    };
    await user.updateAttributes({ 'refreshToken': 'null' });
    res.status(200).send({
      'status': 'Ok',
      'logout': true
    }).type('json');
  });
};
