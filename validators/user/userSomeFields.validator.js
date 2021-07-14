const Joi = require('joi');
const { regExp, userRoles } = require('../../constants');

module.exports = {
  createValidUser: Joi.object().keys({
    email: Joi.string().regex(regExp.EMAIL_REGEXP),
    password: Joi.string().regex(regExp.PASSWORD_REGEXP),
    name: Joi.string().min(2).max(50),
    age: Joi.number().min(16).max(100),
    yearOfBirth: Joi.number().min(new Date().getFullYear() - 100).max(new Date().getFullYear()),
    role: Joi.string().allow(...Object.values(userRoles)).default(userRoles.USER)
  })
};
