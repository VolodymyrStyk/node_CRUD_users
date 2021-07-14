const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { FORBIDDEN_ACCES } } = require('../../errors');

module.exports = (rolesArr = []) => (req, res, next) => {
  try {
    if (!rolesArr || !rolesArr.length) {
      return next();
    }

    const { role } = req.user;

    if (!rolesArr.includes(role)) {
      throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN_ACCES.message, FORBIDDEN_ACCES.code);
    }

    next();
  } catch (err) {
    next(err);
  }
};
