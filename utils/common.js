const validate = require('mongoose-validator');
const validator = require('validator');

const { DEFAULT_ERROR, INVALID_DATA, NOT_FOUND } = require('./constants');

const throwMessage = (message) => ({ message });

const throwDefaultError = (res, mes) => res.status(DEFAULT_ERROR).send(throwMessage(mes));

const throwValidationError = (res, mes) => res.status(INVALID_DATA).send(throwMessage(mes));

const throwNotFoundError = (res, mes) => res.status(NOT_FOUND).send(throwMessage(mes));

const urlValidator = validate({
  validator: (value) => validator.isURL(
    value,
    {
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: true,
    },
  ),
  message: 'Передан невалидный URL',
});

module.exports = {
  throwMessage,
  throwDefaultError,
  throwValidationError,
  throwNotFoundError,
  urlValidator,
};
