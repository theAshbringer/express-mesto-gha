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
const MSG_CARD_NOT_FOUND = 'Запрашиваемая карточка не найдена';
const MSG_USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';
const MSG_INVALID_CARD_DATA = 'Переданы некорректные данные при создании карточки';
const MSG_INVALID_LIKE_DATA = 'Переданы некорректные данные для постановки/снятии лайка';
const MSG_INVALID_USER_DATA = 'Переданы некорректные данные при создании пользователя';

module.exports = {
  INVALID_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  CREATED,
  SUCCESS,
  CARD_DELETED,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
  MSG_INVALID_LIKE_DATA,
  MSG_INVALID_USER_DATA,
  MSG_CARD_NOT_FOUND,
  MSG_USER_NOT_FOUND,
  CAST_ERROR,
};
