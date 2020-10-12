const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRoutes = require("./Routes/Auth");
const UserRoutes = require("./Routes/user");
const CategoryRoutes = require("./Routes/category");
const productRoutes = require("./Routes/product");
const OrderRoutes = require("./Routes/order");
const AddressRoutes = require("./Routes/address")

const app = express();

mongoose.connect("mongodb://localhost:27017/E-comm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/Auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", productRoutes);
app.use("/order", OrderRoutes);
app.use("/address", AddressRoutes);

app.listen(8000, () => console.log("server started listening"));
