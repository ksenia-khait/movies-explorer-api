const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { auth } = require('./middlewares/auth');
const { validateRegister, validateLogin } =require('./middlewares/celebrateValidation');
const { register, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/notFoundError');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb:localhost/bitfilmsdb');

app.use(requestLogger);

app.post('/signup', validateRegister, register);
app.post('/signin', validateLogin, login);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/movies'));

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(500).send({ message: 'Что-то пошло не так' });
  }
});

app.listen(
    PORT,
    () => {
        console.log('started on', PORT)
    }
);
