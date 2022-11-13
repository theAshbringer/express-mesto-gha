const Card = require('../../models/card');
const { handleCardError } = require('../cards');
const { throwNotFoundError } = require('../common');
const { MSG_CARD_NOT_FOUND } = require('../constants');

module.exports = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (card) {
      next();
    } else {
      throwNotFoundError(res, MSG_CARD_NOT_FOUND);
    }
  } catch (err) {
    handleCardError(err, res);
  }
};
