const Card = require('../models/card');
const {
  SUCCESS,
  CREATED,
  CARD_DELETED,
  MSG_CARD_NOT_FOUND,
  MSG_FORBIDDEN,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
} = require('../utils/constants');
const { throwMessage } = require('../utils/common');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then(({ _id }) => Card.findById(_id)
      .orFail(new NotFoundError(MSG_CARD_NOT_FOUND))
      .populate(['owner'])
      .then((newCard) => res.status(CREATED).send(newCard)))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new ValidationError(MSG_INVALID_CARD_DATA));
      }
      return next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .sort({ _id: -1 })
    .then((cards) => res.status(SUCCESS).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId).orFail(new NotFoundError(MSG_CARD_NOT_FOUND))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (String(card.owner) !== _id) {
        return Promise.reject(new ForbiddenError(MSG_FORBIDDEN));
      }
    })
    .then(() => Card.deleteOne({ _id: cardId }).orFail(new NotFoundError(MSG_CARD_NOT_FOUND)))
    .then(() => res.status(SUCCESS).send(throwMessage(CARD_DELETED)))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after' },
  ).orFail(new NotFoundError(MSG_CARD_NOT_FOUND))
    .populate(['likes', 'owner'])
    .then((card) => res.status(SUCCESS).send(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after' },
  ).orFail(new NotFoundError(MSG_CARD_NOT_FOUND))
    .populate(['likes', 'owner'])
    .then((card) => res.status(SUCCESS).send(card))
    .catch(next);
};
