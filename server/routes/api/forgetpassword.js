const express = require("express");
const router = express.Router();
const jwt = require("../../config/jwt");
const sendEmail = require("../../config/mailer");
const generateRandomAlpaNum = require("../../util/generateRandonAlphaNum");

const confirmForgetPasswordValidation = require("../../validation/confirmForgetPassword.validation");

const usersModel = require("../../models/Users.model");

router.post("/", async (req, res) => {
  try {
    const validatedValue = await confirmForgetPasswordValidation(req.body);

    const user = await usersModel.findUserByEmail(validatedValue.email);

    if (!user) {
      /*
          if user is null this mean we did not find the user in our db
        */
      res.json({
        msg: "if your email exists you will receive an email",
      });
      return;
    }
    const secretKey = generateRandomAlpaNum(8);

    const token = await jwt.generateToken(
      {
        email: validatedValue.email,
        secretKey,
      },
      process.env.JWT_RESET_PASSWORD_KEY,
      { expiresIn: "1h" }
    );

    const link = `${process.env.CLIENT_URL || "http://localhost:3000"}/resetpassword/${token}`;

    // sendEmail(
    //   process.env.EMAIL_EMAIL,
    //   validatedValue.email,
    //   "reset password",
    //   `<a href="${link}">click here to reset your password</a>`
    // );
    console.log("link", link);
    res.json({ msg: "if your email exists you will receive an email" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
