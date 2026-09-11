const express = require("express");
const router = express.Router();

const multer = require("../../config/multerTypes");
const upload = multer.createMulter(
  "uploads/",
  3000000,
  multer.allowedTypes.img
);

const animalsValidation = require("../../validation/animals.validation");
const animalsSchema = require("../../models/Animals.model");

router.get("/", async (req, res) => {
  try {
    const animals = await animalsSchema.selectAniamls();
    res.json(animals);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

router.post("/", upload.single("animalimg"), async (req, res) => {
  try {
    const validatedValue = await animalsValidation.addAnimalValidation(
      req.body
    );
    const img = req.file.destination + req.file.filename;
    const animal = await animalsSchema.saveAnimal(
      validatedValue.name,
      validatedValue.race,
      validatedValue.date,
      validatedValue.gender,
      img,
      validatedValue.parents
    );
    res.status(201).json(animal);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = router;
