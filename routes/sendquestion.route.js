import { Router } from "express";
import SendQuestionController from "../controller/sendquestion.controller.js"

const app = Router();

// @desc Send question
// @route /event/question
// @acces Public
app.post("/", SendQuestionController);



export default app;
