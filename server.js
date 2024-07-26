import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// route
import MainRoute from "./routes/main.route.js";
import EventRoute from "./routes/event.route.js";
import QuestionRoute from "./routes/question.route.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:7000',
    credentials: true
}));

app.use("/v2", MainRoute);
app.use("/v2", EventRoute);
app.use("/v2", QuestionRoute);

const PORT = process.env.PORT || 7000;
const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URL)
            .then(() => console.log("Database is connected"));

        app.listen(PORT, () =>
            console.log(`Server running on Port: http://localhost:${PORT}/api/v2`)
        );
    } catch (error) {
        console.log(error);
    }
};

await start();
