const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

const {
  getDashboard,
  addUser,
  addStore,
  getAllUsers,
  getAllStores,
  getUserById
  
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
router.get(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  getUserById
);
router.post(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  addStore
);

module.exports = router;