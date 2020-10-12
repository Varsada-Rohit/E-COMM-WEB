const Category = require("../Models/Category");
const { validationResult } = require("express-validator");

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: "Failed to load categories" });
    }
    return res.json(categories);
  });
};

exports.createCategory = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "unable to save category try again " });
    }
    return res.json(category);
  });
};

exports.getCategoryFromId = (req, res, next, catID) => {
  Category.findOne({ _id: catID }).exec((err, category) => {
    if (err) {
      return res.status(404).json({ error: "Category not found" });
    }
    req.category = category;
    next();
  });
};

exports.getCategory = (req, res) => {
  res.json(req.category);
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    { new: true },
    (err, category) => {
      if (err) {
        return res
          .status(404)
          .json({ error: "Failed to update category try again..." });
      }
      return res.json(category);
    }
  );
};

exports.removeCategory = (req, res) => {
  Category.remove({ _id: req.category._id }, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ error: "Failed to delete category try again..." + err });
    }
    res.json({ message: "Successfully removed category" });
  });
};
