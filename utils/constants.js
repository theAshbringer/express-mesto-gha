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
const MSG_MISSING_AUTH_HEADER = 'Передан некорректный токен в заголовке';
const MSG_INVALID_CARD_DATA = 'Переданы некорректные данные при создании карточки';
const MSG_INVALID_LIKE_DATA = 'Переданы некорректные данные для карточки';
const MSG_INVALID_USER_DATA = 'Переданы некорректные данные пользователя';
const MSG_DEFAULT = 'На сервере произошла ошибка';

// Patterns for validation
const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;
const LINK_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

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
  MSG_MISSING_AUTH_HEADER,
  NOT_FOUND_ERROR,
  MSG_DEFAULT,
  OBJECT_ID_PATTERN,
  LINK_PATTERN,
};
