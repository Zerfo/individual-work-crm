/* @flow */
const registration = require('./v1/registration');
const auth = require('./v1/auth');

module.exports = app => {
	registration(app);
	auth(app);
};
