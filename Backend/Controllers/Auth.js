const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../Models/User");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: "error while signup " + err });
    }
    return res.status(200).json({
      Name: user.firstName + " " + user.lastName,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "user not Found" });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password does not match",
      });
    }
    const token = jwt.sign({ _id: user._id }, "E-comm");
    res.cookie("token", token, { expire: new Date() + 999 });

    const { email, name, _id, role } = user;
    res.status(200).json({ token, name, email, _id, role });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "successfully signed out",
  });
};

exports.isSignedIn = expressJwt({
  secret: "E-comm",
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "user is not authenticated ",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "you are not admin" });
  }
  next();
};
