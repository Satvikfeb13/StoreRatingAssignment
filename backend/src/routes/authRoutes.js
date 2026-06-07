const express = require("express");

const {
  signup,
  login,
  changePassword
} = require("../controllers/authController");
const authenticate =
require("../middleware/authMiddleware");



const router = express.Router();
router.put(
  "/change-password",
  authenticate,
  changePassword
);
router.post("/signup", signup);

router.post("/login", login);

module.exports = router;