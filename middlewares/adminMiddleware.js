let jwt = require("jsonwebtoken");

exports.auth = function(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (
    req.originalUrl.startsWith("/api/user") || req.originalUrl.startsWith("/api/auth") ||  
    req.originalUrl.startsWith("/favicon.ico") || req.originalUrl.startsWith("/uploads/") ||
    (req.method === 'GET' && (req.originalUrl === "/api/admin/scripts" ||
    req.originalUrl === "/api/admin/settings" ||
    req.originalUrl === "/api/admin/questions"))
  ) {
    next();
  } else {
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      jwt.verify(bearerToken, process.env.ADMIN_SECRET, (err, authData) => {
        if (err) {
          console.log("Wrong JWT");
          res.sendStatus(401);
        } else {
          //req.adminID = authData.id;
          next();
        }
      });
    } else {
      console.log("JWT missing!");
      res.sendStatus(401);
    }
  }
};
