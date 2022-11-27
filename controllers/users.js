const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  SUCCESS,
  CREATED,
  MSG_USER_NOT_FOUND,
  MSG_AUTH_SUCCESS,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const { throwMessage } = require('../utils/common');

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).status(SUCCESS).send(throwMessage(MSG_AUTH_SUCCESS));
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...req.body, password: hash,
    }))
    .then(({
      name, about, avatar, email,
    }) => res.status(CREATED).send({
      name, about, avatar, email,
    }))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch(next);
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
    .catch(next);
};
