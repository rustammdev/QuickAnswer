const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
// Routes
const HomeRoute = require("./routes/home.route.js");

// Default middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Statik fayllarni ulash
app.use(express.static(path.join(__dirname, "src")));

// Home route
app.use("/", HomeRoute);

// Mavjud bo'lmagan rout uchun error
app.use((req, res, next) => {
  res.status(404).send("This route is not define");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server runnign on Port: ${PORT}`);
});
