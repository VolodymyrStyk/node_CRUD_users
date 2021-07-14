const router = require('express').Router();

const { mainController } = require('../controllers');

router.get('/', mainController.mainPage);

module.exports = router;
