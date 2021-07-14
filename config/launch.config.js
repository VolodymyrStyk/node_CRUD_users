module.exports = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || 'http://localhost',

  DB_CONNECTION_URL: process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/TaskCRUD',

  SERVICE_EMAIL: process.env.SERVICE_EMAIL || 'gmail',
  SERVICE_EMAIL_LOGIN: process.env.SERVICE_EMAIL_LOGIN || 'No Email',
  SERVICE_EMAIL_PASS: process.env.SERVICE_EMAIL_PASS || 'No Pass',
  SERVICE_EMAIL_ACTIVATE: process.env.SERVICE_EMAIL_ACTIVATE || 'http://localhost:5000/authentication/activate/',

  STATIC: process.env.STATIC || 'static'
};
