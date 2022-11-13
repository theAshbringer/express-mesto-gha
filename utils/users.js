const {
  throwValidationError,
  throwDefaultError,
  // throwNotFoundError,
} = require('./common');
const {
  VALIDATION_ERROR,
  MSG_INVALID_USER_DATA,
  // MSG_USER_NOT_FOUND,
  CAST_ERROR,
} = require('./constants');

const handleCreateUserError = (err, res) => {
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, MSG_INVALID_USER_DATA);
  } else {
    throwDefaultError(res, err.message);
  }
};

const handleUserError = (err, res) => {
  if (err.name === CAST_ERROR) {
    throwValidationError(res, MSG_INVALID_USER_DATA);
    return;
  }
  throwDefaultError(res, err.message);
};

const handleUpdateProfileError = (err, res) => {
  // if (err.name === CAST_ERROR) {
  //   throwNotFoundError(res, MSG_USER_NOT_FOUND);
  //   return;
  // }
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, MSG_INVALID_USER_DATA);
    return;
  }
  throwDefaultError(res, err.message);
};

module.exports = {
  handleCreateUserError,
  handleUserError,
  handleUpdateProfileError,
};
