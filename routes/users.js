const router = require('express').Router();
const {
  createUser, getUserById, getUsers, updateProfile, updateAvatar,
} = require('../controllers/users');
const validateUser = require('../utils/middleware/validateUser');

router.get('/', getUsers);

router.get('/:userId', validateUser, getUserById);

router.post('/', createUser);

router.patch('/me', updateProfile);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
