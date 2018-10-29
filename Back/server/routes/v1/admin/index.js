const express = require('express');
const router = express.Router();
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');

router.get('/info', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('claims/all', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('computers/all',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});