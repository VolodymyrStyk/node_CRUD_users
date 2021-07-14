module.exports = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'ROOT',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'ROOT',

  AUTHORIZATION: process.env.AUTHORIZATION || 'Authorization',

  ACCESS: process.env.ACCESS || 'access',
  ACCESS_T_DURATION: process.env.ACCESS_T_DURATION || '10m',
  ACCESS_TOKEN_TYPE: process.env.ACCESS_TOKEN_TYPE || 'accessToken',

  REFRESH: process.env.REFRESH || 'refresh',
  REFRESH_T_DURATION: process.env.REFRESH_T_DURATION || '10d',
  REFRESH_TOKEN_TYPE: process.env.REFRESH_TOKEN_TYPE || 'refreshToken',
};
