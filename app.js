const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { throwMessage } = require('./utils/common');
const {
  MSG_ROUTE_NOT_FOUND, NOT_FOUND, DEFAULT_ERROR, MSG_DEFAULT, MSG_REGISTERED_USER, CONFLICT,
} = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const signupValidator = require('./validators/signup-validator');
const signinValidator = require('./validators/signin-validator');

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

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let { statusCode = DEFAULT_ERROR, message } = err;
  if (err.code === 11000) {
    statusCode = CONFLICT;
    message = MSG_REGISTERED_USER;
  }
  res.status(statusCode).send({
    message: statusCode === DEFAULT_ERROR ? MSG_DEFAULT : message,
  });
});

app.use((req, res) => res.status(NOT_FOUND).send(throwMessage(MSG_ROUTE_NOT_FOUND)));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
