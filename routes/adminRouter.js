var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/events", adminController.getEvents);
router.post("/event", adminController.createEvent);
router.put("/event/:id", adminController.updateEvent);
router.delete("/event/:id", adminController.deleteEvent);

router.get("/questions", adminController.getQuestions);
router.post("/question", adminController.createQuestion);
router.put("/question/:id", adminController.updateQuestion);
router.delete("/question/:id", adminController.deleteQuestion);

router.get("/settings", adminController.getSettings);
router.post("/setting", adminController.createSettings);
router.put("/setting/:id", adminController.updateSettings);
router.delete("/setting/:id", adminController.deleteSettings);

module.exports = router;
