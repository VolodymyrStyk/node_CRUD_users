const bcrypt = require('bcrypt');

const { ErrorHandler, errorMessages: { WRONG_LOGIN_OR_PASS } } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(statusCode.NOT_FOUND, WRONG_LOGIN_OR_PASS.message, WRONG_LOGIN_OR_PASS.code);
    }
  },
  hash: (password) => bcrypt.hash(password, 10)
};
