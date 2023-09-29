const jwt = require("jsonwebtoken");
const secretKey = "saloonApp";

const jwtConfig = {
  sign(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  },

  verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    // console.log(token);
     if (!token) {
       return res.status(401).json({ message: "No token provided" });
     }

    const decoded = jwt.verify(token, secretKey);
    // console.log(decoded);
     req.token = decoded;
    //  console.log(req.token);
    next();
  },
};

module.exports = jwtConfig;
