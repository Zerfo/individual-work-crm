module.exports = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') return res.status(401).send({
    'status': 'error',
    'code': '401',
    'message': "Bad Token"
  }); else next();
}