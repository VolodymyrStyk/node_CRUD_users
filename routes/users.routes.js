const router = require('express').Router();

const { usersController } = require('../controllers');
const { config: { authConfig: { ACCESS_TOKEN_TYPE } } } = require('../config');
const { userRoles } = require('../constants');
const { userMiddleware, authMiddleware } = require('../middlewares');
const { userValidation: { userUpdateValidator, userValidator } } = require('../validators');

router.get('/', usersController.users.getAllUsers);

router.post('/',
  userMiddleware.checkUploadFiles,
  userMiddleware.checkAvatar,
  userMiddleware.checkAllDataValid,
  userMiddleware.checkEmailExist,
  usersController.users.createUser);

router.use('/:userId',
  userMiddleware.checkUserRole(),
  userMiddleware.checkIsUserExist,
  authMiddleware.checkToken(ACCESS_TOKEN_TYPE));

router.get('/:userId',
  usersController.users.getUserById);

router.patch('/:userId',
  userMiddleware.checkDataValid(userUpdateValidator),
  userMiddleware.checkEmailExist,
  usersController.users.updateSomeField);

router.put('/:userId',
  userMiddleware.checkUserRole(userRoles.MANAGER),
  userMiddleware.checkDataValid(userValidator),
  userMiddleware.checkEmailExist,
  usersController.users.updateUser);

router.delete('/:userId',
  usersController.users.deleteUserById);

router.get('/:userId/avatar',
  usersController.users.getAvatars);

router.post('/:userId/avatar',
  userMiddleware.checkUploadFiles,
  usersController.users.addAvatar);

router.delete('/:userId/avatar',
  userMiddleware.checkIsAvatarExist,
  usersController.users.deleteAvatar);

router.delete('/:userId/avatar/:avatarId',
  userMiddleware.checkIsAvatarExist,
  usersController.users.deleteChoseAvatar);

router.post('/:userId/avatar/set/:avatarId',
  userMiddleware.checkIsAvatarExist,
  usersController.users.setAvatar);

router.get('/:userId/documents',
  usersController.users.getDocuments);

router.post('/:userId/documents',
  userMiddleware.checkUploadFiles,
  usersController.users.addDocuments);

router.post('/:userId/:docId',
  userMiddleware.checkUploadFiles,
  usersController.users.deleteChoseDocument);

module.exports = router;
