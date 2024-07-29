const jwt = require("jsonwebtoken");

const createToken = (_id, date) => {
  return jwt.sign({ _id }, process.env.KEY, {
    expiresIn: date,
  });
};


module.exports = {
  createToken,
};
