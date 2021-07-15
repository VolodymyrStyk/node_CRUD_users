const {
  normalizator: {
    PASSWORD, MAIL_TOKEN, IS_DELETE, NEW_PASSWORD
  }
} = require('../constants');

module.exports = {
  userNormalizator: (userToNormalize = {}) => {
    const fieldsToRemove = [
      PASSWORD,
      MAIL_TOKEN,
      IS_DELETE,
      NEW_PASSWORD
    ];

    fieldsToRemove.forEach((field) => {
      delete userToNormalize[field];
    });
    return userToNormalize;
  }
};
