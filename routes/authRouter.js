var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginAdmin);
router.post("/forgot", authController.forgotPassword);
router.put("/reset-password/:userId/:token", authController.changeForgotPassword)

module.exports = router;
