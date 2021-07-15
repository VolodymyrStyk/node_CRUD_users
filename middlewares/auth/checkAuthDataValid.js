const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { VALIDATION_ERROR } } = require('../../errors');

module.exports = (validator) => (req, res, next) => {
  try {
    const { error } = validator.createValidAuth.validate(req.body);

    if (error) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, error.details[0].message, VALIDATION_ERROR.code);
    }

    next();
  } catch (err) {
    next(err);
  }
};
