const {
  throwValidationError,
  throwDefaultError,
} = require('./common');
const {
  VALIDATION_ERROR,
  MSG_INVALID_USER_DATA,
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
