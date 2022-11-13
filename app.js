const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { throwNotFoundError } = require('./utils/common');
const { MSG_ROUTE_NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '636be555be4bd456aab78311',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => throwNotFoundError(res, MSG_ROUTE_NOT_FOUND));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT);
