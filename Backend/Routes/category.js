const express = require("express");
const { check } = require("express-validator");

const { isAdmin, isSignedIn, isAuthenticated } = require("../Controllers/Auth");
const { getUserByUserID } = require("../Controllers/user");
const {
  getAllCategories,
  createCategory,
  getCategoryFromId,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../Controllers/category");

const router = express.Router();

router.param("id", getUserByUserID);
router.param("catId", getCategoryFromId);

router.get("/categories", getAllCategories);
router.get("/:catId", getCategory);
router.put(
  "/update/:catId/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
router.post(
  "/create/:id",
  [check("name", "Category name is required").isLength({ min: 1 })],
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.delete(
  "/remove/:catId/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
