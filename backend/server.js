const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { uploadRouter } = require("./routers/uploadRouter.js");
const userRouter = require("./routers/userRouter.js");
const dotenv = require("dotenv");
const { productRouter } = require("./routers/productRouter.js");
const { orderRouter } = require("./routers/orderRouter.js");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shopit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

let reqPath = path.join(__dirname, "../");

app.use("/uploads", express.static(path.join(reqPath, "/uploads")));
app.get("/", (req, res) => {
  res.send("Server is good to ");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
