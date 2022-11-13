const User = require('../../models/user');
const { throwNotFoundError } = require('../common');
const { MSG_USER_NOT_FOUND } = require('../constants');
const { handleUserError } = require('../users');

module.exports = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      next();
    } else {
      throwNotFoundError(res, MSG_USER_NOT_FOUND);
    }
  } catch (err) {
    handleUserError(err, res);
  }
};
