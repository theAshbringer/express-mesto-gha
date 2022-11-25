const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  SUCCESS,
  CREATED,
  DEFAULT_ERROR,
  MSG_USER_NOT_FOUND,
} = require('../utils/constants');
const { throwMessage } = require('../utils/common');
const NotFoundError = require('../errors/not-found-err');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => res.status(CREATED).send(newUser))
    .catch(next);
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => res.status(DEFAULT_ERROR).send(throwMessage(err.message)));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId).orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => res.status(SUCCESS).send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { returnDocument: 'after', runValidators: true },
  ).orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => res.status(SUCCESS).send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { returnDocument: 'after' },
  ).orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => res.status(SUCCESS).send(user))
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => next(err));
};
