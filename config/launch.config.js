module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'http://localhost',

  DB_CONNECTION_URL: process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/TaskCRUD',

  SERVICE_EMAIL: process.env.SERVICE_EMAIL || 'gmail',
  SERVICE_EMAIL_LOGIN: process.env.SERVICE_EMAIL_LOGIN || 'No Email',
  SERVICE_EMAIL_PASS: process.env.SERVICE_EMAIL_PASS || 'No Pass',
  SERVICE_EMAIL_ACTIVATE: process.env.SERVICE_EMAIL_ACTIVATE || 'http://localhost:3000/auth/activate/',
  SERVICE_EMAIL_PASSWORD: process.env.SERVICE_EMAIL_PASSWORD || 'http://localhost:3000/auth/password/',

  STATIC: process.env.STATIC || 'static',
  EMAIL_TEMPLATES: process.env.EMAIL_TEMPLATES || 'emailTemplates'
};
