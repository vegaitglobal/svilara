var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/events", adminController.getEvents);
router.post("/event", adminController.createEvent);
router.put("/event/:id", adminController.updateEvent);
router.put("/event/picture/:id", adminController.updateEventPicture);
router.delete("/event/:id", adminController.deleteEvent);

router.put("/event/accept/:id", adminController.acceptEvent);
router.put("/event/reject/:id", adminController.rejectEvent);

router.put("/event/page/:id", adminController.updateEventPage);
router.get("/event/page/:id", adminController.getEventPage);

router.get("/questions", adminController.getQuestions);
router.post("/question", adminController.createQuestion);
router.put("/question/:id", adminController.updateQuestion);
router.delete("/question/:id", adminController.deleteQuestion);

router.get("/settings", adminController.getSettings);
router.post("/setting", adminController.createSettings);
router.put("/setting/:id", adminController.updateSettings);
router.delete("/setting/:id", adminController.deleteSettings);

router.get("/scripts", adminController.getScripts);
router.post("/script", adminController.createScript);


module.exports = router;
