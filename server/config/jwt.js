const jwt = require("jsonwebtoken");
const generateToken = (payload, privateKey, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      /*
            if jwt cant create token it will fail the promise and will pass the error
            else it will pass the token
        */
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyToken = (token, privateKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, dataFromToken) => {
      /*
                if error then fail the promise and send the error
                else send dataFromToken
            */
      if (err) reject(err);
      else resolve(dataFromToken);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
