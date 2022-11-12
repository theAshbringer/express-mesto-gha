const { Schema, model } = require('mongoose');
const { urlValidator } = require('../utils/common');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
});

module.exports = model('card', cardSchema);
