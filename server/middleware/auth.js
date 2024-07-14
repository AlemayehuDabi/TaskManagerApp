const jwt = require("jsonwebtoken");

const authProtection = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, msg: "User unauthorized" });
    }

    jwt.verify(token, process.env.KEY, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  authProtection,
};
