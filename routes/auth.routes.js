const router = require('express').Router();

const { authController: { authController } } = require('../controllers');
const { config: { authConfig: { ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE } } } = require('../config');
const { authMiddleware } = require('../middlewares');
const { authValidator: { authValid, passChangeValid } } = require('../validators');

router.post('/login',
  authMiddleware.checkAuthDataValid(authValid),
  authMiddleware.findByEmailPassword,
  authController.login);

router.post('/logout',
  authMiddleware.checkToken(ACCESS_TOKEN_TYPE),
  authController.logout);

router.post('/refresh',
  authMiddleware.checkToken(REFRESH_TOKEN_TYPE),
  authController.refresh);

router.post('/activate/:token',
  authMiddleware.checkMailToken,
  authController.activate);

router.post('/password',
  authMiddleware.checkToken(ACCESS_TOKEN_TYPE),
  authMiddleware.checkAuthDataValid(passChangeValid),
  authMiddleware.findByEmailPassword,
  authController.changePass);

router.post('/password/:mailToken',
  authController.updatePass);

module.exports = router;
