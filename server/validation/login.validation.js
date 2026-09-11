const joi = require("joi");

const loginSchema = joi.object({
  email: joi.string().email().min(7).max(255).trim().required(),
  password: joi.string().required().min(8).max(255),
});
/*
    *trim will remove every space before and after the words
    !trim will not remove space between the words
*/

const loginValidation = (userData) => {
  return loginSchema.validateAsync(userData);
};

module.exports = loginValidation;
