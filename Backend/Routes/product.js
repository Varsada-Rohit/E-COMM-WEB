const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../Controllers/Auth");
const { getUserByUserID } = require("../Controllers/user");
const {
  getProducts,
  createProduct,
  getProductById,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllUniqueCategory,
  photo,
} = require("../Controllers/product");

router.param("id", getUserByUserID);
router.param("productId", getProductById);

router.get("/products", getProducts);
router.get("/:productId", getProduct);
router.get("/categories/all", getAllUniqueCategory);
router.get("/photo/:productId", photo);

router.delete(
  "/:productId/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.put(
  "/update/:productId/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
router.post("/add/:id", isSignedIn, isAuthenticated, isAdmin, createProduct);

module.exports = router;
