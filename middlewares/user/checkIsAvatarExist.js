const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { RECORD_NOT_FOUND } } = require('../../errors');

module.exports = (req, res, next) => {
  try {
    const { user: { avatar } } = req;

    if (!avatar) {
      throw new ErrorHandler(statusCode.NOT_FOUND, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
    }

    req.avatar = avatar;

    next();
  } catch (e) {
    next(e);
  }
};
