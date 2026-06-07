const express = require("express");

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

const {
  getOwnerDashboard,
  getStoreRatings
} = require("../controllers/ownerController");

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("STORE_OWNER"),
  getOwnerDashboard
);
router.get(
  "/ratings",
  authenticate,
  authorize("STORE_OWNER"),
  getStoreRatings
);
module.exports = router;