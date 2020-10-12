const express = require("express")
const router = express.Router();

const {getUserByUserID} = require("../Controllers/user")
const {createAddress} = require("../Controllers/address")

router.param("id",getUserByUserID)

router.post("/create/:id",createAddress)

module.exports = router