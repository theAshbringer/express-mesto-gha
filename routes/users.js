const router = require('express').Router();
const {
  getUserById, getUsers, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');
const { avatarValidator, userIdValidator, profileValidator } = require('../validators/users');

router.get('/', getUsers);

router.get('/me', getProfile);

router.get('/:userId', userIdValidator, getUserById);

router.patch('/me', profileValidator, updateProfile);

router.patch('/me/avatar', avatarValidator, updateAvatar);

module.exports = router;
