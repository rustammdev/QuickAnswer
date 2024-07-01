import "dotenv/config";
import express from "express";
import { create } from "express-handlebars";
import HomeRoute from "./routes/home.route.js";
import RegisterRoute from "./routes/register.route.js";
import LoginRoute from "./routes/login.route.js";
import SendQuestionRoute from "./routes/send.question.js";
import { dashboardController } from "./controller/dashboard.controller.js";
import cookieParser from "cookie-parser";
import connectDb from "./db/mongo.js";

const app = express();
connectDb();

// Default middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

// cookieParser middleware
app.use(cookieParser());

// Public katalogini statik fayllar uchun o'rnating
app.use(express.static("public"));

// Home route
app.use("/", HomeRoute);

// Send questions
app.use("/event", SendQuestionRoute);

// User registeration
app.use("/register", RegisterRoute);

// User login
app.use("/login", LoginRoute);

// Dashboard
app.get("/dashboard", dashboardController);

// 404
app.get("/404", (req, res) => {
  res.render("404")
})

// Mavjud bo'lmagan rout uchun error
app.use((req, res, next) => {
  res.status(404).redirect("/404");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server runnign on Port: ${PORT}`);
});
