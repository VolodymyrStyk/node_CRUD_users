const { statusCode, authConst: { AUTHORIZATION } } = require('../../constants');
const { OAuthModel } = require('../../dataBase');
const { ErrorHandler, errorMessages: { UNAUTHORIZED, WRONG_TOKEN, FORBIDDEN_ACCES } } = require('../../errors');
const { authService } = require('../../services');

module.exports = (tokenType) => async (req, res, next) => {
  try {
    const token = req.get(AUTHORIZATION);
    const { body: { email } } = req;
    if (!token) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, UNAUTHORIZED.message, UNAUTHORIZED.code);
    }

    await authService.verifyToken(token);

    const tokenObject = await OAuthModel.findOne({ [tokenType]: token });

    if (!tokenObject) {
      throw new ErrorHandler(statusCode.UNAUTHORIZED, WRONG_TOKEN.message, WRONG_TOKEN.code);
    }
    req.email = email;
    req.user = tokenObject.user_id;

    if (req.user.id !== req.params.userId && req.params.userId) {
      throw new ErrorHandler(statusCode.FORBIDDEN, FORBIDDEN_ACCES.message, FORBIDDEN_ACCES.code);
    }

    next();
  } catch (err) {
    next(err);
  }
};
