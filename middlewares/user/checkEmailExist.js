const { statusCode } = require('../../constants');
const { UserModel } = require('../../dataBase');
const { ErrorHandler, errorMessages: { USER_EXIST, } } = require('../../errors');

module.exports = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
    const findUserByEmail = await UserModel.findOne({ email });

    if (findUserByEmail) {
      throw new ErrorHandler(statusCode.CONFLICT, USER_EXIST.message, USER_EXIST.code);
    }

    next();
  } catch (err) {
    next(err);
  }
};
