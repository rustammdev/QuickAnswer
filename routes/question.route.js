import QuestionController from '../controller/question.controller.js'
import express from "express";
const router = express.Router();

// middleware
import authMiddleware from "../middleware/auth.middleware.js";

// @desc Get all questions
// @route GET '/v2/event/:id/questions'
// @access Only users and moderators
router.get("/event/:id/questions", authMiddleware, QuestionController.getQuestions)

// @desc Send questions
// @route POST '/v2/event/:id/questions'
// @access Public
router.post("/event/:id/questions", QuestionController.sendQuestion)

// @desc Send questions
// @route GET '/v2/event/:id/questions/generate'
// @access Only users and moderators
router.post("/event/:id/questions/generate", authMiddleware, QuestionController.generateQuestion);


export default router;