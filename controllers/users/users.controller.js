const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const {
  succesMessage, statusCode, emailTemplates, dirName, fileType
} = require('../../constants');

const { emailActions: { CREATE_NEW_USER, DELETE_USER, UPDATE_USER } } = require('../../constants');
const { config: { launchConfig: { SERVICE_EMAIL_ACTIVATE, STATIC }, authConfig: { AUTHORIZATION } } } = require('../../config');
const { UserModel, OAuthModel } = require('../../dataBase');

const {
  passHasher,
  userNormalize,
  filePathBuilder: { filePathBuilder },
  getSortedFile: { getSortedFiles }
} = require('../../helpers');

const { mailService, authService } = require('../../services');

const unlinkPromise = promisify(fs.unlink);

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await UserModel.find({ isDelete: false }).lean();

      users.map((user) => userNormalize.userNormalizator(user));

      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  getUserById: (req, res, next) => {
    try {
      const { user } = req;
      const normalizeUser = userNormalize.userNormalizator(user.toJSON());

      res.json(normalizeUser);
    } catch (err) {
      next(err);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const {
        avatar,
        body: { password, email, name }
      } = req;

      const hashedPassword = await passHasher.hash(password);
      const tokenPair = authService.generateTokenPair();
      req.body.mailToken = tokenPair.accessToken;

      const cretedUser = await UserModel.create({ ...req.body, password: hashedPassword });
      const { mailToken, _id } = cretedUser;
      const activateUrl = SERVICE_EMAIL_ACTIVATE + mailToken;

      await mailService.sendMail(email, CREATE_NEW_USER, {
        userName: name,
        activateUrl,
        userMail: email
      }, emailTemplates.SUBJ_CREATE);

      if (avatar) {
        const { finalPath, filePath } = await filePathBuilder(avatar.name, _id, dirName.USERS, fileType.PHOTOS);
        await avatar.mv(finalPath);
        await UserModel.updateOne({ _id }, { $push: { avatars: filePath } });
        await UserModel.updateOne({ _id }, { avatar: filePath });
        cretedUser.avatar = filePath;
        cretedUser.avatars.push(filePath);
      }

      res.status(statusCode.CREATED_UPDATED).json(succesMessage.NEW_USER);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body } = req;
      const { password, name, email } = body;

      const hashedPassword = await passHasher.hash(password);

      const userData = { ...req.body, password: hashedPassword };

      await UserModel.findByIdAndUpdate(userId, userData, { runValidators: true, useFindAndModify: false });
      await mailService.sendMail(email, UPDATE_USER, { userName: name }, emailTemplates.SUBJ_UPDATE);

      res.status(statusCode.CREATED_UPDATED).json(succesMessage.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { email, name } = req.user;

      const token = req.get(AUTHORIZATION);

      await OAuthModel.remove({ accessToken: token });
      await UserModel.findOneAndUpdate({ _id: userId }, { isDelete: true });
      await mailService.sendMail(email, DELETE_USER, { userName: name }, emailTemplates.SUBJ_DELETE);

      res.status(statusCode.NO_CONTENT_DELETED).json(succesMessage.DELETED_SUCCESS);
    } catch (err) {
      next(err);
    }
  },

  updateSomeField: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { body, user: { email } } = req;
      const { password, name } = body;

      if (password) {
        const hashedPassword = await passHasher.hash(password);

        const userData = { ...req.body, password: hashedPassword };

        await UserModel.findByIdAndUpdate(userId, userData, { runValidators: true, useFindAndModify: false });
      }

      if (!password) {
        await UserModel.findByIdAndUpdate(userId, body, { runValidators: true, useFindAndModify: false });
      }

      await mailService.sendMail(email, UPDATE_USER, { userName: name }, emailTemplates.SUBJ_UPDATE);

      res.status(statusCode.CREATED_UPDATED).json(succesMessage.UPDATE_USER);
    } catch (err) {
      next(err);
    }
  },

  addAvatar: async (req, res, next) => {
    try {
      const [avatar] = req.photos;
      const { userId } = req.params;

      if (avatar) {
        const { finalPath, filePath, fileNameExt } = await filePathBuilder(avatar.name, userId, dirName.USERS, fileType.PHOTOS);
        await avatar.mv(finalPath);
        await UserModel.updateOne({ _id: userId }, { $push: { avatars: filePath } });
        await UserModel.updateOne({ _id: userId }, { avatar: filePath });

        res.status(statusCode.CREATED_UPDATED).json(fileNameExt);
      }
    } catch (err) {
      next(err);
    }
  },

  getAvatars: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const dirPath = path.join(process.cwd(), STATIC, dirName.USERS, userId, fileType.PHOTOS);

      const files = await getSortedFiles(dirPath);

      res.json(files);
    } catch (e) {
      next(e);
    }
  },

  deleteAvatar: async (req, res, next) => {
    try {
      const { params: { userId } } = req;
      const dirPath = path.join(process.cwd(), STATIC, dirName.USERS, userId, fileType.PHOTOS);

      const files = await getSortedFiles(dirPath);

      const currentAva = files[0];
      const previousAva = files[1];

      const pathC = path.join(process.cwd(), STATIC, dirName.USERS, userId, fileType.PHOTOS, currentAva);

      await unlinkPromise(pathC);

      const { filePath } = await filePathBuilder(previousAva, userId, dirName.USERS, fileType.PHOTOS);
      await UserModel.updateOne({ _id: userId }, { avatar: filePath });

      res.json(filePath);
    } catch (e) {
      next(e);
    }
  },

  deleteChoseAvatar: async (req, res, next) => {
    try {
      const { params: { userId, avatarId } } = req;

      const dirPath = path.join(process.cwd(), STATIC, dirName.USERS, userId, fileType.PHOTOS);

      const deletePhotoDir = path.join(process.cwd(), STATIC, dirName.USERS, userId, fileType.PHOTOS, avatarId);
      const deletePhotoDB = path.join(dirName.USERS, userId, fileType.PHOTOS, avatarId);

      await unlinkPromise(deletePhotoDir);

      const files = await getSortedFiles(dirPath);

      const [previousAva] = files;
      const pathCurrent = path.join(dirName.USERS, userId, fileType.PHOTOS, previousAva);

      await UserModel.updateOne({ _id: userId }, { $pull: { avatars: deletePhotoDB } });
      await UserModel.updateOne({ _id: userId }, { avatar: pathCurrent });

      res.json(avatarId);
    } catch (e) {
      next(e);
    }
  },
};
