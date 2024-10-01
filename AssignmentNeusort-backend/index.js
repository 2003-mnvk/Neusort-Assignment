const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config");
const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

// Routes
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
