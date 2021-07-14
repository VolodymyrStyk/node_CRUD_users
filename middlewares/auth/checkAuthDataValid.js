const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { VALIDATION_ERROR } } = require('../../errors');
const { authValidator: { authValid } } = require('../../validators');

module.exports = (req, res, next) => {
  try {
    const { error } = authValid.createValidAuth.validate(req.body);

    if (error) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, VALIDATION_ERROR.code);
    }

    next();
  } catch (err) {
    next(err);
  }
};
