const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne(cardId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};
