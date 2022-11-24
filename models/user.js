const bcrypt = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { urlValidator, emailValidator } = require('../utils/common');
const { AUTH_ERROR, MSG_USER_UNAUTHORIZED } = require('../utils/constants');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: urlValidator,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: emailValidator,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail({ name: AUTH_ERROR })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error(MSG_USER_UNAUTHORIZED));
      }

      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
