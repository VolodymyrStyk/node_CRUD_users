const { ErrorHandler, errorMessages: { WRONG_MIME_TYPE, FILE_SIZE_ERROR } } = require('../../errors');
const {
  statusCode,
  fileMimetypes: {
    DOCS_MIMETYPES,
    VIDEOS_MIMETYPES,
    PHOTOS_MIMETYPES,
    PHOTO_MAX_SIZE,
    DOCS_MAX_SIZE,
    VIDEO_MAX_SIZE
  }
} = require('../../constants');

module.exports = (req, res, next) => {
  try {
    if (req.files) {
      const files = Object.values(req.files);
      const documents = [];
      const videos = [];
      const photos = [];

      for (let i = 0; i < files.length; i++) {
        const { name, size, mimetype } = files[i];

        if (PHOTOS_MIMETYPES.includes(mimetype)) {
          if (size > PHOTO_MAX_SIZE) {
            throw ErrorHandler(statusCode.BAD_REQUEST, FILE_SIZE_ERROR.message(name), FILE_SIZE_ERROR.code);
          }

          photos.push(files[i]);
        } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
          if (size > VIDEO_MAX_SIZE) {
            throw ErrorHandler(statusCode.BAD_REQUEST, FILE_SIZE_ERROR.message(name), FILE_SIZE_ERROR.code);
          }

          videos.push(files[i]);
        } else if (DOCS_MIMETYPES.includes(mimetype)) {
          if (size > DOCS_MAX_SIZE) {
            throw ErrorHandler(statusCode.BAD_REQUEST, FILE_SIZE_ERROR.message(name), FILE_SIZE_ERROR.code);
          }

          documents.push(files[i]);
        } else {
          throw ErrorHandler(statusCode.BAD_REQUEST, WRONG_MIME_TYPE.message(name), WRONG_MIME_TYPE.code);
        }
      }

      req.documents = documents;
      req.videos = videos;
      req.photos = photos;
    }

    next();
  } catch (e) {
    next(e);
  }
};
