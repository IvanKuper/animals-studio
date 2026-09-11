const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create Users schema */
const animalsSchema = new Schema({
  name: { type: String, required: true },
  race: { type: String, required: true },
  date: { type: Date, require: true },
  gender: { type: String, require: true },
  img: { type: String },
  parents: {
    father: { type: Schema.Types.ObjectId, ref: "animals" },
    mother: { type: Schema.Types.ObjectId, ref: "animals" },
  },
});

/*
    create collection
    create object to munipulate the data
*/
const Animals = mongoose.model("animals", animalsSchema);

const saveAnimal = (name, race, date, gender, img, parents) => {
  let animalToSave = {
    name,
    race,
    date,
    gender,
    img,
  };
  if (parents && (parents.father || parents.mother)) {
    animalToSave.parents = {};
    if (parents.father) {
      animalToSave.parents.father = parents.father;
    }
    if (parents.mother) {
      animalToSave.parents.mother = parents.mother;
    }
  }
  console.log("animalToSave", animalToSave);
  const animal = new Animals(animalToSave);
  return animal.save();
};

const selectAniamls = () => {
  return Animals.find();
};

module.exports = {
  saveAnimal,
  selectAniamls,
};
