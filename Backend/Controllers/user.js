const User = require("../Models/User");

exports.test = (req, res) => {
  res.json({ message: "yup" });
};

exports.getUserByUserID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(402).json({
        error: "user not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encr_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(402).json({
          error: "unable to update" + err,
        });
      }
      user.encr_password = undefined;
      user.salt = undefined;
      res.status(200).json(user);
    }
  );
};
