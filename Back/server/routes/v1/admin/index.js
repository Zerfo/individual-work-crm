const express = require('express');
const router = express.Router();
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');

const config = require('../../../config');

router.get('/info', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('claims/all', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.delete('claims/delete', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.post('claims/new_comment', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.put('claims/update', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('computers/take_user', jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.post('computers/add',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.post('computers/reset',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});

router.get('computers/all',jwtMiddleware({ secret: config.secret }), BadTokenRequest, async (req, res) => {

});
