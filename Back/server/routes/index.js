/* @flow */
const jwtMiddleware = require('express-jwt');

const singup = require('./v1/auth/singup');
const login = require('./v1/auth/login');
const refresh = require('./v1/auth/refresh');
const logout = require('./v1/auth/logout');

module.exports = app => {
	singup(app);
	login(app);
	refresh(app);
	app.use(
		jwtMiddleware({
			secret: 'SUPERSECTER'
		})
	);
	logout(app)
};
