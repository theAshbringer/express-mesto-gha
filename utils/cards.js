const {
  CAST_ERROR,
  CARD_NOT_FOUND,
  INVALID_LIKE_DATA,
  VALIDATION_ERROR,
  INVALID_CARD_DATA,
} = require('./constants');
const { throwValidationError, throwDefaultError, throwNotFoundError } = require('./common');

const handleCreateCardError = (err, res) => {
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, INVALID_CARD_DATA);
  } else {
    throwDefaultError(res, err.message);
  }
};

const handleLikeError = (err, res) => {
  if (err.name === CAST_ERROR) {
    throwNotFoundError(res, CARD_NOT_FOUND);
    return;
  }
  if (err.name === VALIDATION_ERROR) {
    throwValidationError(res, INVALID_LIKE_DATA);
    return;
  }
  throwDefaultError(res, err.message);
};

const handleDeleteCardError = (err, res) => {
  if (err.name === CAST_ERROR) {
    throwNotFoundError(res, CARD_NOT_FOUND);
  } else {
    throwDefaultError(res, err.message);
  }
};

module.exports = {
  handleCreateCardError,
  handleLikeError,
  handleDeleteCardError,
};
