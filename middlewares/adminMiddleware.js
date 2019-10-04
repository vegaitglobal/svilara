let jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = function(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.ADMIN_SECRET, (err, authData) => {
      if (err) {
        console.log("Wrong JWT");
        res.sendStatus(403);
      } else {
        req.adminID = authData.id;
        next();
      }
    });
  } else {
    console.log("JWT missing!");
    res.sendStatus(403);
  }
};
