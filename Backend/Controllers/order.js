const { Order } = require("../Models/order");

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "error saving order",
      });
    }
    return res.json(order);
  });
};

exports.getAllOrder = (req, res) => {
  Order.find()
    .populate("products.product", "name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "failed to load orders",
        });
      }
      return res.json(orders);
    });
};
