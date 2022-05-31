const express = require("express");
const authController = require("./../Controllers/authController");
const statsController = require("./../Controllers/statsController");

const router = express.Router();

router
  .route("/doctor-number")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.staffNumber
  );

router
  .route("/working-hours")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.staffWorkingHours
  );

module.exports = router;
