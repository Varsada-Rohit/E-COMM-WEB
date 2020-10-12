const express = require("express");
const router = express.Router();

const { createOrder, getAllOrder } = require("../Controllers/order");
const { getUserByUserID } = require("../Controllers/user");

router.param("id", getUserByUserID);

router.get("/all", getAllOrder);

router.post("/create/:id", createOrder);

module.exports = router;
