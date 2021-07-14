module.exports = {
  RECORD_NOT_FOUND: {
    message: 'Record not found.',
    code: 4041
  },

  ROUTE_NOT_FOUND: {
    message: 'Route not found.',
    code: 4042
  },

  TEMPLATE_NOT_FOUND: {
    message: 'Wrong template, can not found.',
    code: 4043
  },

  BAD_ID: {
    message: 'Bad ID parameters, please input correct ID',
    code: 4001
  },

  EMPTY_LOGIN: {
    message: 'Login can not be EMPTY!',
    code: 4002
  },

  EMPTY_PASSWORD: {
    message: 'Password can not be EMPTY!',
    code: 4003
  },

  SHORT_PASS: {
    message: 'You input too short password, you need input at least 3 symbol. ',
    code: 4004
  },

  WRONG_LOGIN_OR_PASS: {
    message: 'Not found user, wrong login or password!',
    code: 4005
  },

  EMPTY_EMAIL: {
    message: 'Can not register. Empty email field!',
    code: 4006
  },

  EMPTY_NAME: {
    message: 'Can not register. Empty name field!',
    code: 4007
  },

  VALIDATION_ERROR: {
    message: 'Can not register. Empty email field!',
    code: 4008
  },

  WRONG_ID_FORMAT: {
    message: 'Wrong ID format, please check ID',
    code: 4009
  },

  WRONG_MIME_TYPE: {
    message: (name) => `Wrong file ${name} format, please try another file.`,
    code: 40010
  },

  FILE_SIZE_ERROR: {
    message: (name) => `File ${name} which you upload is to big, please load another file.`,
    code: 40011
  },

  AVATAR_UPLOAD: {
    message: 'Please, load only one avatar',
    code: 40012
  },

  USER_EXIST: {
    message: 'User with this EMAIL exist, please input another EMAIL',
    code: 4091
  },

  FORBIDDEN_ACCES: {
    message: 'Forbidden. Permission denied!!!',
    code: 4031
  },

  NOT_ACTIVE_EMAIL: {
    message: 'Forbidden, you email is not active. Please activate your email!!!',
    code: 4031
  },

  UNKNOWN_ERROR: {
    message: 'Unknown error',
    code: 0
  },

  UNAUTHORIZED: {
    message: 'Unauthorized user, NO TOKEN, please authorize.',
    code: 4011
  },

  WRONG_TOKEN: {
    message: 'Unauthorized user, WRONG TOKEN, please authorize, or refresh token.',
    code: 4012
  }
};
