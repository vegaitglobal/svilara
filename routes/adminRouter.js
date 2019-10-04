var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/events", adminController.getEvents);

module.exports = router;
