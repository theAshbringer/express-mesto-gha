// Status codes
const CREATED = 201;
const SUCCESS = 200;
const INVALID_DATA = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;

// Messages
const CARD_DELETED = 'Пост удалён';

// Error names
const VALIDATION_ERROR = 'ValidationError';
const NOT_FOUND_ERROR = 'NotFoundError';
const CAST_ERROR = 'CastError';
const AUTH_ERROR = 'AuthError';

// Error messages
const MSG_ROUTE_NOT_FOUND = 'Запрашиваемый путь не найден';
const MSG_CARD_NOT_FOUND = 'Запрашиваемая карточка не найдена';
const MSG_USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';
const MSG_USER_UNAUTHORIZED = 'Неправильные почта или пароль';
const MSG_INVALID_CARD_DATA = 'Переданы некорректные данные при создании карточки';
const MSG_INVALID_LIKE_DATA = 'Переданы некорректные данные для карточки';
const MSG_INVALID_USER_DATA = 'Переданы некорректные данные пользователя';

module.exports = {
  INVALID_DATA,
  NOT_FOUND,
  DEFAULT_ERROR,
  AUTH_ERROR,
  CREATED,
  SUCCESS,
  UNAUTHORIZED,
  CARD_DELETED,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
  MSG_INVALID_LIKE_DATA,
  MSG_INVALID_USER_DATA,
  MSG_USER_UNAUTHORIZED,
  MSG_CARD_NOT_FOUND,
  MSG_USER_NOT_FOUND,
  MSG_ROUTE_NOT_FOUND,
  CAST_ERROR,
  NOT_FOUND_ERROR,
};
