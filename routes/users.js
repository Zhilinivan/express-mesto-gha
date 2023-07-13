const router = require('express').Router();

const {
  getUserInfo, getUsers, findUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/users', getUsers);
router.get('/users/:userId', findUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
