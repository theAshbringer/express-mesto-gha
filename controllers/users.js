const User = require('../models/user');
const { SUCCESS, CREATED } = require('../utils/constants');
const { throwDefaultError } = require('../utils/common');
const { handleCreateUserError, handleUpdateProfileError } = require('../utils/users');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.status(CREATED).send(newUser))
    .catch((err) => handleCreateUserError(err, res));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send(users))
    .catch((err) => throwDefaultError(res, err.message));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => throwDefaultError(res, err));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { returnDocument: 'after', runValidators: true },
  )
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => handleUpdateProfileError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { returnDocument: 'after', runValidators: true },
  )
    .then((user) => res.status(SUCCESS).send(user))
    .catch((err) => handleUpdateProfileError(err, res));
};
