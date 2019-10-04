require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
let authRouter = require("./routes/authRouter");
let adminRouter = require("./routes/adminRouter");
let userRouter = require("./routes/userRouter");
const routes = require("./routes");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static("public"));

//* Coonect to DB
const models = require("./models");

models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL database!");
  })
  .catch(err => {
    console.log("Unable to connect to SQL database:");
    console.log(err);
  });

// Creates table if they do not already exist
//
// models.sequelize.sync();

// models.sequelize.sync({
//     force: true //deletes all tables then recreates them useful for testing and development purposes
// });

//* CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
});

//* vue app
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// //* ROUTERS
app.use("/api/auth/", authRouter);
app.use("/api/admin/", adminRouter);
app.use("/api/user/", userRouter);

//* NOT FOUND
app.get("*", function(req, res) {
  res.send("NOT FOUND!");
});

//Listen to port
const port = process.env.SERVER_PORT;
let server = app.listen(port);
console.log("Listening to port: " + port);
