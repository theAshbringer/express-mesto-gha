const {
  CAST_ERROR,
  MSG_CARD_NOT_FOUND,
  MSG_INVALID_LIKE_DATA,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
} = require('./constants');
const { throwValidationError, throwDefaultError, throwNotFoundError } = require('./common');

const handleCreateCardError = (err, res) => {
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, MSG_INVALID_CARD_DATA);
  } else {
    throwDefaultError(res, err.message);
  }
};

const handleLikeError = (err, res) => {
  if (err.name === CAST_ERROR) {
    throwNotFoundError(res, MSG_CARD_NOT_FOUND);
    return;
  }
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, MSG_INVALID_LIKE_DATA);
    return;
  }
  throwDefaultError(res, err.message);
};

const handleDeleteCardError = (err, res) => {
  if (err.name === CAST_ERROR) {
    throwNotFoundError(res, MSG_CARD_NOT_FOUND);
  } else {
    throwDefaultError(res, err.message);
  }
};

module.exports = {
  handleCreateCardError,
  handleLikeError,
  handleDeleteCardError,
};
