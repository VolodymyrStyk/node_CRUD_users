const mongoose = require('mongoose');

const { config: { launchConfig } } = require('../config');
const { succesMessage: { CONNECT_DB_SUCCESS } } = require('../constants');

module.exports = {
  _mongooseConnector: () => {
    mongoose.connect(launchConfig.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log(CONNECT_DB_SUCCESS))
      .catch((e) => console.log(e));
  }
};
