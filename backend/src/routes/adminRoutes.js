const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

const {
  getDashboard,
  addUser,
  addStore,
  getAllUsers,
  getAllStores
  
} = require("../controllers/adminController");
router.get(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  getAllStores
);
router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  getAllUsers
);
router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  getDashboard
);
router.post(
  "/users",
  authenticate,
  authorize("ADMIN"),
  addUser
);
router.post(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  addStore
);

module.exports = router;