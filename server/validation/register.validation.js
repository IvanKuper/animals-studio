const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required().min(2).max(255).trim(),
  email: joi.string().email().min(7).max(255).trim().required(),
  password: joi.string().required().min(8).max(255),
});
/*
    *trim will remove every space before and after the words
    !trim will not remove space between the words
*/

const registerValidation = (userData) => {
  return registerSchema.validateAsync(userData);
};

module.exports = registerValidation;
