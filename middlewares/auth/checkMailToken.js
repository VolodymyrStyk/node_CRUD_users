const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { WRONG_TOKEN } } = require('../../errors');
const { UserModel } = require('../../dataBase');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.params;
    const userByToken = await UserModel.findOneAndUpdate({ mailToken: token }, { activate: true }, { new: true });

    if (!userByToken) {
      throw new ErrorHandler(statusCode.NOT_FOUND, WRONG_TOKEN.message, WRONG_TOKEN.code);
    }

    req.user = userByToken;

    next();
  } catch (err) {
    next(err);
  }
};
