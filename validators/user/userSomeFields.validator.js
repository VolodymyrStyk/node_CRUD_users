const Joi = require('joi');
const { regexp, userRolesEnum } = require('../../constants');

module.exports = {
  createValidUser: Joi.object().keys({
    email: Joi.string().regex(regexp.EMAIL_REGEXP),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP),
    name: Joi.string().min(2).max(50),
    age: Joi.number().min(16).max(100),
    yearOfBirth: Joi.number().min(new Date().getFullYear() - 100).max(new Date().getFullYear()),
    role: Joi.string().allow(...Object.values(userRolesEnum)).default('user')
  })
};
