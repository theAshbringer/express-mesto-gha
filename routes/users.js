const router = require('express').Router();
const {
  createUser, getUserById, getUsers, updateProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', updateProfile);

module.exports = router;
