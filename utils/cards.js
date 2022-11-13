const {
  CAST_ERROR,
  MSG_INVALID_LIKE_DATA,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
} = require('./constants');
const { throwValidationError, throwDefaultError } = require('./common');

const handleCreateCardError = (err, res) => {
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, MSG_INVALID_CARD_DATA);
  } else {
    throwDefaultError(res, err.message);
  }
};

const handleCardError = (err, res) => {
  if (err.name === CAST_ERROR) {
    throwValidationError(res, MSG_INVALID_LIKE_DATA);
    return;
  }
  throwDefaultError(res, err.message);
};

module.exports = {
  handleCreateCardError,
  handleCardError,
};
