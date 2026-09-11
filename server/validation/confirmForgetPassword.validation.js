const joi = require("joi");

const confirmForgetPasswordSchema = joi.object({
  email: joi.string().email().min(7).max(255).trim().required(),
});

const confirmForgetPasswordValidation = (userData) => {
  return confirmForgetPasswordSchema.validateAsync(userData);
};

module.exports = confirmForgetPasswordValidation;
