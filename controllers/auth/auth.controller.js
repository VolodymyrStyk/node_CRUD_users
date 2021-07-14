const { OAuthModel } = require('../../dataBase');
const { authService, mailService } = require('../../services');
const { config: { authConfig: { AUTHORIZATION } } } = require('../../config');

const {
  succesMessage: { SUCCESS },
  statusCode: { CREATED_UPDATED, NO_CONTENT_DELETED },
  emailActions: { WELCOME, LOG_OUT }
} = require('../../constants');

const { userNormalize } = require('../../helpers');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;
      const tokenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokenPair, user_id: _id });
      await mailService.sendMail(email, WELCOME, { userName: name });

      const normalizeUser = userNormalize.userNormalizator(req.user.toJSON());

      res.status(CREATED_UPDATED).json({ ...tokenPair, user: normalizeUser });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { email, name } = req.user;
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });
      await mailService.sendMail(email, LOG_OUT, { userName: name });

      res.status(NO_CONTENT_DELETED).json(SUCCESS);
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ refreshToken: token });

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });

      const normalizeUser = userNormalize.userNormalizator(req.user.toJSON());

      res.status(CREATED_UPDATED).json({ ...tokkenPair, user: normalizeUser });
    } catch (err) {
      next(err);
    }
  },

  activate: async (req, res, next) => {
    try {
      const { _id, email, name } = req.user;

      const tokkenPair = authService.generateTokenPair();

      await OAuthModel.create({ ...tokkenPair, user_id: _id });
      await mailService.sendMail(email, WELCOME, { userName: name });

      const normalizeUser = userNormalize.userNormalizator(req.user.toJSON());

      res.status(CREATED_UPDATED).json({ ...tokkenPair, user: normalizeUser });
    } catch (err) {
      next(err);
    }
  },
};
