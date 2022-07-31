const router = require('express').Router();

const {
  getUser,
  updateUser,
} =require('../controllers/users');

const {
  validateGetUser,
  validateUpdateUser,
} =require('../controllers/validations');

router.get('/users/me', validateGetUser, getUser);
router.patch('/users/me', validateUpdateUser, updateUser);

module.exports = router;

