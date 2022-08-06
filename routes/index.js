const router = require('express').Router();

const { validateRegister, validateLogin } = require('../middlewares/celebrateValidation');
const { register, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.post('/signup', validateRegister, register);
router.post('/signin', validateLogin, login);

router.use('/', auth, require('./users'));
router.use('/', auth, require('./movies'));

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
