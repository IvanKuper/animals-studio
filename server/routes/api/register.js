const express = require("express");
const router = express.Router();
const registerValidation = require("../../validation/register.validation");
const usersModel = require("../../models/Users.model");
const bcrypt = require("../../config/bcrypt");
const sendEmail = require("../../config/mailer");
const generateRandomAlphaNum = require("../../util/generateRandonAlphaNum");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await registerValidation(req.body);
    // console.log("validatedValue", validatedValue);
    const user = await usersModel.findUserByEmail(validatedValue.email);
    if (user) {
      throw "email already exists";
      // create error and pass over to catch
      //the string will be err in catch
    }

    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    const secretKey = generateRandomAlphaNum(8);

    await usersModel.createUser(
      validatedValue.name,
      validatedValue.email,
      hashedPassword,
      secretKey
    );
    const linkToSend = `${process.env.SERVER_URL || "http://localhost:8000"}/api/confirmregister/${validatedValue.email}/${secretKey}`;
    await sendEmail(
      process.env.EMAIL_EMAIL,
      validatedValue.email,
      "Please confirm your email",
      linkToSend
    );

    res.status(201).json({ msg: "registered, check your email to confirm" });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ err }); //.json(...) like send but convert the data to json
    // res.status(400).json({ err:err });
  }
});

module.exports = router;
