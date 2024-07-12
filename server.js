import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

// route
import MainRoute from "./routes/main.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", MainRoute);

const PORT = process.env.PORT || 7000;
const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URL)
            .then(() => console.log("Database is connected"));

        app.listen(PORT, () =>
            console.log(`Server running on Port: http://localhost:${PORT}/api`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
