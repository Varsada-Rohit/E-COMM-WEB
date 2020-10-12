const express = require("express");
const { signup, signin, signout, isSignedIn } = require("../Controllers/Auth");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    check("email", "Enter valid email").isEmail(),
    check("firstName", "firstName must be at least 3 chars long").isLength({
      min: 3,
    }),
    check("password", "password must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Enter valid email").isEmail(),
    check("password", "password is required").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

// router.put("/test", (req, res) => {
//   res.json({ messaage: "yup" });
// });

module.exports = router;
