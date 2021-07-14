const Joi = require('joi');
const { regExp, userRoles } = require('../../constants');

module.exports = {
  createValidUser: Joi.object().keys({
    email: Joi.string().regex(regExp.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regExp.PASSWORD_REGEXP).required(),
    name: Joi.string().min(2).max(50).required(),
    age: Joi.number().min(16).max(100).required(),
    yearOfBirth: Joi.number().min(new Date().getFullYear() - 100).max(new Date().getFullYear()),
    role: Joi.string().allow(...Object.values(userRoles)).default(userRoles.USER)
  })
};
