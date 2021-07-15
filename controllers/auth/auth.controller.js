const { OAuthModel, UserModel } = require('../../dataBase');
const { authService, mailService } = require('../../services');
const { config: { authConfig: { AUTHORIZATION }, launchConfig: { SERVICE_EMAIL_PASSWORD } } } = require('../../config');

const {
  succesMessage: {
    SUCCESS, USER_ACTIVE, PASS_CHANGE_CONFIRM, PASS_CHANGE_SUCCESS
  },
  statusCode: { CREATED_UPDATED, NO_CONTENT_DELETED },
  emailActions: { WELCOME, LOG_OUT, CHANGE_PASSWORD },
  emailTemplates: { SUBJ_UPDATE }
} = require('../../constants');

const { userNormalize, passHasher } = require('../../helpers');

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
      const { email, name } = req.user;

      await mailService.sendMail(email, WELCOME, { userName: name });

      res.status(CREATED_UPDATED).json(USER_ACTIVE);
    } catch (err) {
      next(err);
    }
  },

  changePass: async (req, res, next) => {
    try {
      const { email, newPassword } = req.body;
      const { name, _id } = req.user;

      const hashedPassword = await passHasher.hash(newPassword);
      const mailToken = authService.generateTokenPair().accessToken;

      await UserModel.findOneAndUpdate({ _id }, { mailToken, newPassword: hashedPassword });

      const activateUrl = `${SERVICE_EMAIL_PASSWORD}${mailToken}`;

      await mailService.sendMail(email, CHANGE_PASSWORD, {
        userName: name,
        activateUrl,
        userMail: email
      }, SUBJ_UPDATE);

      res.status(CREATED_UPDATED).json(PASS_CHANGE_CONFIRM);
    } catch (err) {
      next(err);
    }
  },

  updatePass: async (req, res, next) => {
    try {
      const { mailToken } = req.params;

      const { newPassword } = await UserModel.findOne({ mailToken });

      await UserModel.findOneAndUpdate({ mailToken }, { password: newPassword });

      res.status(CREATED_UPDATED).json(PASS_CHANGE_SUCCESS);
    } catch (err) {
      next(err);
    }
  },
};
