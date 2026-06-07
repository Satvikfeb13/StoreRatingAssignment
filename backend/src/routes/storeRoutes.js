const express = require("express");
const authenticate = require("../middleware/authMiddleware");

const {
  searchStores
} = require("../controllers/storeController");

const router = express.Router();

router.get(
  "/",
  authenticate,
  searchStores
);

module.exports = router;