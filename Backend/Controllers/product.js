const Product = require("../Models/Product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Failed to load products..." + err });
      }
      return res.json(products);
    });
};

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category", "name")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "error parsing",
      });
    }

    const { name, description, price, stock, category } = fields;
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: "please include all fields",
      });
    }
    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big !",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "error while storing product",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete product",
      });
    }
    return res.json({
      message: "product deleted successfully" + deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "error parsing",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big !",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "error while storing product",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllUniqueCategory = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "filed to load all unique categories",
      });
    }
    return res.json(categories);
  });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
};
