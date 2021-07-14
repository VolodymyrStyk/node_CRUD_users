const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { NOT_ACTIVE_EMAIL, WRONG_LOGIN_OR_PASS } } = require('../../errors');
const { passHasher } = require('../../helpers');
const { UserModel } = require('../../dataBase');

module.exports = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const userByLogin = await UserModel.findOne({ email });

    if (!userByLogin) {
      throw new ErrorHandler(statusCode.BAD_REQUEST, WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
    }

    const { isEmailActive } = userByLogin;

    if (!isEmailActive) {
      throw new ErrorHandler(statusCode.FORBIDDEN, NOT_ACTIVE_EMAIL.message, NOT_ACTIVE_EMAIL.code);
    }

    await passHasher.compare(userByLogin.password, password);

    req.user = userByLogin;

    next();
  } catch (err) {
    next(err);
  }
};
