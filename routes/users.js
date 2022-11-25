const router = require('express').Router();
const {
  getUserById, getUsers, updateProfile, updateAvatar, getProfile,
} = require('../controllers/users');
const { updateAvatarValidator, getUserByIdValidator, updateProfileValidator } = require('../validators/users');

router.get('/', getUsers);

router.get('/me', getProfile);

router.get('/:userId', getUserByIdValidator, getUserById);

router.patch('/me', updateProfileValidator, updateProfile);

router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
