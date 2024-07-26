import QuestionController from '../controller/question.controller.js'
import express from "express";
const router = express.Router();

// middleware
import authMiddleware from "../middleware/auth.middleware.js";

// @desc Get all questions
// @route Post '/v2/event/:id/questions'
// @access Only users and moderators
router.get("/event/:id/questions", authMiddleware, QuestionController.getQuestions)


export default router;