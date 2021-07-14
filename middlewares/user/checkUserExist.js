const { statusCode } = require('../../constants');
const { UserModel } = require('../../dataBase');
const { ErrorHandler, errorMessages: { BAD_ID, WRONG_ID_FORMAT } } = require('../../errors');
const { userValidation: { userIdValidator } } = require('../../validators');

module.exports = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const isIdValid = userIdValidator(userId);

    if (!isIdValid) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_ID_FORMAT.message, WRONG_ID_FORMAT.code);
    }

    const userById = await UserModel.findById(userId);

    if (!userById) {
      throw new ErrorHandler(statusCode.NOT_FOUND, BAD_ID.message, BAD_ID.code);
    }

    req.user = userById;

    next();
  } catch (err) {
    next(err);
  }
};
