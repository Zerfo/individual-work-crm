/* @flow */
const crypto = require('crypto');

const hash = text => crypto.createHash('sha1').update(text).digest('base64');

module.exports = app => {
	app.get('/api/v1/auth', (req, res) => {
  });
};
