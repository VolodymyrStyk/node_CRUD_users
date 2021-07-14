const { statusCode } = require('../../constants');
const { ErrorHandler, errorMessages: { AVATAR_UPLOAD } } = require('../../errors');

module.exports = (req, res, next) => {
  try {
    if (req.photos) {
      if (req.photos.length > 1) {
        throw new ErrorHandler(statusCode.BAD_REQUEST, AVATAR_UPLOAD.message, AVATAR_UPLOAD.code);
      }

      [req.avatar] = req.photos;
    }

    next();
  } catch (e) {
    next(e);
  }
};
