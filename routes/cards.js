const router = require('express').Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', deleteCard);

router.post('/', createCard);

module.exports = router;
