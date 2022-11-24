const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  SUCCESS,
  CREATED,
  VALIDATION_ERROR,
  INVALID_DATA,
  MSG_INVALID_USER_DATA,
  DEFAULT_ERROR,
  NOT_FOUND_ERROR,
  MSG_USER_NOT_FOUND, CAST_ERROR, NOT_FOUND, UNAUTHORIZED, MSG_USER_UNAUTHORIZED, AUTH_ERROR,
} = require('../utils/constants');
const { throwMessage } = require('../utils/common');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch((err) => {
      if (err.name === AUTH_ERROR) {
        return res.status(UNAUTHORIZED).send(throwMessage(MSG_USER_UNAUTHORIZED));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => res.status(CREATED).send(newUser))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_USER_DATA));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send(throwMessage(err.message)));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId).orFail({ name: NOT_FOUND_ERROR })
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_USER_DATA));
      }
      if (err.name === NOT_FOUND_ERROR) {
        return res.status(NOT_FOUND).send(throwMessage(MSG_USER_NOT_FOUND));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { returnDocument: 'after', runValidators: true },
  )
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_USER_DATA));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { returnDocument: 'after', runValidators: true },
  )
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_USER_DATA));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};
