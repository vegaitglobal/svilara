var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/events", adminController.getEvents);
router.get("/questions", adminController.getQuestions);

module.exports = router;
