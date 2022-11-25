const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardIdValidator, cardDataValidator } = require('../validators/cards');

router.get('/', getCards);

router.post('/', cardDataValidator, createCard);

router.delete('/:cardId', cardIdValidator, deleteCard);

router.put('/:cardId/likes', cardIdValidator, likeCard);

router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
