const { normalizator: { PASSWORD, MAIL_TOKEN } } = require('../constants');

module.exports = {
  userNormalizator: (userToNormalize = {}) => {
    const fieldsToRemove = [
      PASSWORD,
      MAIL_TOKEN
    ];

    fieldsToRemove.forEach((field) => {
      delete userToNormalize[field];
    });
    return userToNormalize;
  }
};
