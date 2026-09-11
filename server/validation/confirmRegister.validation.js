const joi = require("joi");

const confirmRegisterSchema = joi.object({
  email: joi.string().email().min(7).max(255).trim().required(),
  secretKey: joi
    .string()
    .pattern(/^[0-9a-z]*$/)
    .length(8)
    .trim()
    .required(),
});
/*
    *trim will remove every space before and after the words
    !trim will not remove space between the words
    pattern like regex
    .pattern(/^[0-9a-z]*$/) will check if it contains numbers and small chars
*/

const confirmRegisterValidation = (userData) => {
  return confirmRegisterSchema.validateAsync(userData);
};

module.exports = confirmRegisterValidation;
