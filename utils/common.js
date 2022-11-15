const validate = require('mongoose-validator');
const validator = require('validator');

const throwMessage = (message) => ({ message });

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
  urlValidator,
};
