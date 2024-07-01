import { Router } from "express";
import SendQuestionController from "../controller/send.question.js"

const app = Router();

// @desc Send question
// @route /event/question
// @acces Public
app.post("/question", SendQuestionController);

app


export default app;
