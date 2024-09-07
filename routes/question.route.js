import QuestionController from '../controller/question.controller.js'
import LikeController from '../controller/like.controller.js'
import express from 'express'
const router = express.Router()

// middleware
import AuthMiddleware from '../middleware/auth.middleware.js'

// @desc Get all questions
// @route GET '/v2/event/:id/questions'
// @access Only
router.get('/event/:id/questions', QuestionController.getQuestions)

// @desc Send questions
// @route POST '/v2/event/:id/questions'
// @access Public
router.post('/event/:id/questions', QuestionController.sendQuestion)

// @desc Send questions
// @route GET '/v2/event/:id/questions/generate'
// @access Only users and moderators
router.post(
    '/event/:id/questions/generate',
    AuthMiddleware,
    QuestionController.generateQuestion,
)

// @desc Send questions
// @route GET '/api/questions/:id/setlikes'
// @access Only users
router.put('/question/:id/like', AuthMiddleware, LikeController.SetLikes)

// @desc Send questions
// @route GET '/api/questions/:id/setunlikes'
// @access Only users
router.put('/question/:id/unlike', AuthMiddleware, LikeController.SetUnLikes)

export default router
