let jwt = require("jsonwebtoken");

exports.auth = function(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (
    req.originalUrl.startsWith("/api/user") ||
    req.originalUrl.startsWith("/api/auth/login") ||
    req.originalUrl.startsWith("/api/auth/forgot") ||
    req.originalUrl.startsWith("/api/auth/reset-password") ||
    req.originalUrl.startsWith("/favicon.ico") ||
    req.originalUrl.startsWith("/uploads/") ||
    (req.method === "GET" &&
      (req.originalUrl === "/api/admin/scripts" ||
        req.originalUrl === "/api/admin/settings" ||
        req.originalUrl === "/api/admin/questions"))
  ) {
    next();
  // } else if (req.originalUrl.startsWith("/api/auth/reset-password")) {
  //   const { token } = req.params;
  //   console.log(req)
  //   if (token) {
  //     jwt.verify(token, process.env.ADMIN_SECRET, (err, authData) => {
  //       if (err) {
  //         console.log("Wrong JWT");
  //         res.statusCode = 401;
  //         return res.json({
  //           success: false,
  //           error: "Nije vam dozvoljeno da menjate šifru!"
  //         });
  //         //res.sendStatus(401);
  //       } else {
  //         next();
  //       }
  //     });
  //   } else {
  //     console.log("JWT missing!");
  //     res.statusCode = 401;
  //     return res.json({
  //       success: false,
  //       error: "Nije vam dozvoljeno da menjate šifru!"
  //     });
  //     //res.sendStatus(401);
  //   }
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
