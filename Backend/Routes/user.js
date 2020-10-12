const express = require("express");
const router = express.Router();
const {
  test,
  getUserByUserID,
  getUser,
  updateUser,
} = require("../Controllers/user");
const { isAuthenticated, isSignedIn } = require("../Controllers/Auth");

router.get("/test", test);
router.param("id", getUserByUserID);
router.get("/:id", isSignedIn, isAuthenticated, getUser);
router.put("/:id/update", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
