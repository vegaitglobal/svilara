var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/events", userController.getEvents);

router.get("/event/page/:id", userController.getEventPage);

module.exports = router;
