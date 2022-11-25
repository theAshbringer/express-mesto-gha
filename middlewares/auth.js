const jwt = require('jsonwebtoken');
const { throwMessage } = require('../utils/common');
const { UNAUTHORIZED, MSG_MISSING_AUTH_HEADER } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!req.cookies.jwt && (!authorization || !authorization.startsWith('Bearer '))) {
    return res.status(UNAUTHORIZED).send(throwMessage(MSG_MISSING_AUTH_HEADER));
  }

  const token = req.cookies.jwt ? req.cookies.jwt : extractBearerToken(authorization);

  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (error) {
    return res.status(UNAUTHORIZED).send(throwMessage(MSG_MISSING_AUTH_HEADER));
  }
  req.user = payload;

  next();
};
