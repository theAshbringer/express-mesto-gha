const Card = require('../models/card');
const {
  SUCCESS, CREATED, CARD_DELETED,
} = require('../utils/constants');
const {
  throwMessage, throwDefaultError,
} = require('../utils/common');
const { handleCreateCardError } = require('../utils/cards');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch((err) => handleCreateCardError(err, res));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(SUCCESS).send(cards))
    .catch((err) => throwDefaultError(res, err));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then(() => res.status(SUCCESS).send(throwMessage(CARD_DELETED)))
    .catch((err) => throwDefaultError(res, err));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after' },
  )
    .then((card) => res.status(SUCCESS).send({ likes: card.likes }))
    .catch((err) => throwDefaultError(res, err));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after' },
  )
    .then((card) => res.status(SUCCESS).send({ likes: card.likes }))
    .catch((err) => throwDefaultError(res, err));
};
