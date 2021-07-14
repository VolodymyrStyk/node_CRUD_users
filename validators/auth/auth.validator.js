const Joi = require('joi');
const { regExp } = require('../../constants');

module.exports = {
  createValidAuth: Joi.object().keys({
    email: Joi.string().regex(regExp.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regExp.PASSWORD_REGEXP).required(),
  })
};
