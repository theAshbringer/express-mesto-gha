const Card = require('../models/card');
const {
  SUCCESS,
  CREATED,
  CARD_DELETED,
  INVALID_DATA,
  DEFAULT_ERROR,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
  NOT_FOUND_ERROR,
  CAST_ERROR, NOT_FOUND,
  MSG_CARD_NOT_FOUND,
  MSG_MISSING_AUTH_HEADER,
} = require('../utils/constants');
const { throwMessage } = require('../utils/common');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_CARD_DATA));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(SUCCESS).send(cards))
    .catch((err) => res.status(DEFAULT_ERROR).send(throwMessage(err.message)));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId).orFail({ name: NOT_FOUND_ERROR })
    // eslint-disable-next-line consistent-return
    .then((card) => {
      // eslint-disable-next-line eqeqeq
      if (card.owner != _id) {
        return Promise.reject(new Error(MSG_MISSING_AUTH_HEADER));
      }
    })
    .then(() => Card.deleteOne({ _id: cardId }).orFail({ name: NOT_FOUND_ERROR }))
    .then(() => res.status(SUCCESS).send(throwMessage(CARD_DELETED)))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_CARD_DATA));
      }
      if (err.name === NOT_FOUND_ERROR) {
        return res.status(NOT_FOUND).send(throwMessage(MSG_CARD_NOT_FOUND));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after' },
  ).orFail({ name: NOT_FOUND_ERROR })
    .then((card) => res.status(SUCCESS).send({ likes: card.likes }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_CARD_DATA));
      }
      if (err.name === NOT_FOUND_ERROR) {
        return res.status(NOT_FOUND).send(throwMessage(MSG_CARD_NOT_FOUND));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after' },
  ).orFail({ name: NOT_FOUND_ERROR })
    .then((card) => res.status(SUCCESS).send({ likes: card.likes }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return res.status(INVALID_DATA).send(throwMessage(MSG_INVALID_CARD_DATA));
      }
      if (err.name === NOT_FOUND_ERROR) {
        return res.status(NOT_FOUND).send(throwMessage(MSG_CARD_NOT_FOUND));
      }
      return res.status(DEFAULT_ERROR).send(throwMessage(err.message));
    });
};
