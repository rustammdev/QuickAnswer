import "dotenv/config";
import express from "express";
import { create } from "express-handlebars";
import HomeRoute from "./routes/home.route.js";
import RegisterRoute from "./routes/register.route.js";
import LoginRoute from "./routes/login.route.js";
import SendQuestionRoute from "./routes/send.question.js";
import CreateEventRoute from "./routes/events.route.js";
import DashboardRoute from "./routes/dashboard.route.js";
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
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  helpers: {
    json: function (context) {
      return JSON.stringify(context, null, 2);
    },
  },
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
app.use("/dashboard", DashboardRoute);

// Create event
app.use("/events", CreateEventRoute);
// 404
app.get("/404", (req, res) => {
  res.render("404", {
    title: "Not Found | Qmarge",
  });
});

// Mavjud bo'lmagan rout uchun error
app.use((req, res, next) => {
  res.status(404).redirect("/404");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server runnign on Port: ${PORT}`);
});
