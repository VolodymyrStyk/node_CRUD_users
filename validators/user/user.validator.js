const Joi = require('joi');
const { regexp, userRolesEnum } = require('../../constants');

module.exports = {
  createValidUser: Joi.object().keys({
    email: Joi.string().regex(regexp.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexp.PASSWORD_REGEXP).required(),
    name: Joi.string().min(2).max(50).required(),
    age: Joi.number().min(16).max(100).required(),
    yearOfBirth: Joi.number().min(new Date().getFullYear() - 100).max(new Date().getFullYear()),
    role: Joi.string().allow(...Object.values(userRolesEnum)).default('user')
  })
};
