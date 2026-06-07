const express = require("express");

const authenticate =
  require("../middleware/authMiddleware");

const {
  submitRating,updateRating
} = require("../controllers/ratingController");

const router = express.Router();

router.post(
  "/",
  authenticate,
  submitRating
);
router.put(
  "/:id",
  authenticate,
  updateRating
);

module.exports = router;