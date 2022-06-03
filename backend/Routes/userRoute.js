const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router
  .route("/myUpOps")
  .get(authController.protect, userController.getUpcomingOperations);
router
  .route("/requests")
  .get(
    authController.protect,
    authController.restrictTo("lead-doctor", "lead-nurse", "ORadmin", "admin"),
    userController.userInBody,
    userController.getPendingRequests
  );
router
  .route("/myPrevOps")
  .get(authController.protect, userController.getPerviousOperations);
router
  .route("/patients")
  .get(authController.protect, userController.getMyPatients);
router
  .route("/emergency")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    userController.availableDoctor
  );
router.patch("/updateMe", authController.protect, userController.updateMe);
router.get("/me", authController.protect, userController.getMe);

router
  .route("/is-available/:id")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    userController.isAvailable
  );
router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    userController.createUser
  );
router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  );

module.exports = router;
