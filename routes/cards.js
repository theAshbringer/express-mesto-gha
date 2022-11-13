const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const validateCard = require('../utils/middleware/validateCard');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', validateCard, deleteCard);

router.put('/:cardId/likes', validateCard, likeCard);

router.delete('/:cardId/likes', validateCard, dislikeCard);

module.exports = router;
