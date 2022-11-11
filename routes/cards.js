const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', deleteCard);

router.post('/', createCard);

router.put('/:cardId', likeCard);

module.exports = router;
