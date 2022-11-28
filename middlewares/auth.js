const jwt = require('jsonwebtoken');
const { throwMessage } = require('../utils/common');
const { UNAUTHORIZED, MSG_MISSING_AUTH_HEADER } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return res.status(UNAUTHORIZED).send(throwMessage(MSG_MISSING_AUTH_HEADER));
  }

  let payload;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (error) {
    return res.status(UNAUTHORIZED).send(throwMessage(MSG_MISSING_AUTH_HEADER));
  }
  req.user = payload;

  next();
};
