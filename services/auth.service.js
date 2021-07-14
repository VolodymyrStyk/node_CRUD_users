const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const {
  config: {
    authentConfig: {
      ACCESS,
      ACCESS_T_DURATION,
      ACCESS_TOKEN_SECRET,
      REFRESH_T_DURATION,
      REFRESH_TOKEN_SECRET
    }
  }
} = require('../config');

const verifyTokenPromise = promisify(jwt.verify);

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_T_DURATION });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_T_DURATION });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    const secretWord = tokenType === ACCESS ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

    await verifyTokenPromise(token, secretWord);
  }
};
