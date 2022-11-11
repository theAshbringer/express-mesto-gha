// Status codes
const INVALID_DATA = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;
const CREATED = 201;
const SUCCESS = 200;

// Messages
const CARD_DELETED = 'Пост удалён';

// Error names
const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';

// Error messages
// eslint-disable-next-line max-len
const INVALID_CARD_DATA = 'Поля name и link не должны быть пустыми, поле name должно содержать от 2 до 30 символов';
const CARD_NOT_FOUND = 'Запрашиваемая карточка не найдена';
const INVALID_LIKE_DATA = 'Переданы некорректные данные для постановки/снятии лайка';

module.exports = {
  INVALID_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  CREATED,
  SUCCESS,
  CARD_DELETED,
  VALIDATION_ERROR,
  INVALID_CARD_DATA,
  INVALID_LIKE_DATA,
  CARD_NOT_FOUND,
  CAST_ERROR,
};
