const joi = require("joi");

const addAnimalSchema = joi.object({
  name: joi.string().required().min(2).max(255).trim(),
  race: joi.string().required().min(2).max(255).trim(),
  date: joi.string().required().min(5).max(255).trim(),
  gender: joi.string().required().min(4).max(255).trim(),
  animalimg: joi.any(),
  parents: joi.object({
    father: joi.string().hex().length(24).trim(),
    mother: joi.string().hex().length(24).trim(),
  }),
});

const addAnimalValidation = (userData) => {
  return addAnimalSchema.validateAsync(userData);
};

module.exports = { addAnimalValidation };
