const jwt = require("jsonwebtoken");

const createToken = (_id, date) => {
  return jwt.sign({ _id }, process.env.KEY, {
    expiresIn: date,
  });
};

//mongodb+srv://Alemayehu:@kokobe1214sr71blackbird#13@taskmanagerapp.dk8b8lj.mongodb.net/?retryWrites=true&w=majority&appName=taskManagerApp

module.exports = {
  createToken,
};
