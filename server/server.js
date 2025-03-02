const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commercev2.vercel.app",
      "https://e-commercev2-7hqy.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/review", shopReviewRouter);

// app.listen(PORT, () => console.log(`PORT is running on ${PORT}`));
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is now running `);
});
