const { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeaders = (req) => {
  //check if there is something called authorization in the headers && if the first word is Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  } else {
    return null;
  }
};

const authenticateToken = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});
module.exports = { authenticateToken };
