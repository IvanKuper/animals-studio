const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create Users schema */
const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isMailValid: { type: Boolean, default: false },
  secretKey: { type: String },
});

/*
    create collection
    create object to munipulate the data
*/
const Users = mongoose.model("users", usersSchema);

const findUserByEmail = (email) => {
  return Users.findOne({ email });
};

const createUser = (name, email, hashedPassword, secretKey) => {
  const user = new Users({
    name,
    email,
    password: hashedPassword,
    secretKey,
  });
  return user.save();
};

const updateIsMailValid = (email) => {
  return Users.findOneAndUpdate({ email }, { isMailValid: true });
};

const updateUserPasswordByEmail = (email, hashedPassword) => {
  return Users.findOneAndUpdate({ email }, { password: hashedPassword });
};

module.exports = {
  findUserByEmail,
  createUser,
  updateIsMailValid,
  updateUserPasswordByEmail,
};
