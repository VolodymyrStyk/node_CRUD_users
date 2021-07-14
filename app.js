require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const { config: { launchConfig } } = require('./config');
const { connectDB: { _mongooseConnector }, errorsHandler: { _notFoundHandler, _handleErrors } } = require('./helpers');
const apiRouter = require('./routes');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), launchConfig.STATIC)));

app.use(fileUpload({}));

app.use('/', apiRouter);

app.use('*', _notFoundHandler);
app.use(_handleErrors);

app.listen(launchConfig.PORT, () => console.log(`App works on: ${launchConfig.HOST}:${launchConfig.PORT}`));
