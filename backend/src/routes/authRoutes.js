const express = require("express");

const {
  signup,
  login,
  changePassword
} = require("../controllers/authController");

const authenticate =
require("../middleware/authMiddleware");

const {
  validateUser
} = require("../middleware/validation");

const router = express.Router();

router.put(
  "/change-password",
  authenticate,
  changePassword
);

router.post(
  "/signup",
  validateUser,
  signup
);

router.post(
  "/login",
  login
);

module.exports = router;