import { Router } from "express";
import SendQuestionController from "../controller/send.question.js"

const app = Router();

// @desc Send question
// @route /event/question
// @acces Public
app.post("/event/question", SendQuestionController);

export default app;
