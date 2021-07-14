const router = require('express').Router();

const usersRouter = require('./users.routes');
const authRouter = require('./auth.routes');
const mainRouter = require('./main.routes');

router.use('/', mainRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports.userRoute = require('./users.routes');
module.exports.authenticationRouter = require('./auth.routes');
module.exports.mainRoute = require('./main.routes');

module.exports = router;
