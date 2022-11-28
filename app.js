const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const {
  MSG_ROUTE_NOT_FOUND, DEFAULT_ERROR, MSG_DEFAULT,
} = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const signupValidator = require('./validators/signup-validator');
const signinValidator = require('./validators/signin-validator');
const NotFoundError = require('./errors/not-found-err');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());

app.use('/signin', signinValidator, login);

app.use('/signup', signupValidator, createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(errors());

app.use((req, res, next) => next(new NotFoundError(MSG_ROUTE_NOT_FOUND)));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || DEFAULT_ERROR;

  const message = statusCode === DEFAULT_ERROR ? MSG_DEFAULT : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
