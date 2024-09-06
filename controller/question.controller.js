import QuestionServices from '../services/question.services.js'
import jwt from 'jsonwebtoken'
import RegisterModel from '../models/register.model.js'

class QuestionController {
    async getQuestions(req, res) {
        try {
            const id = req.params.id
            const data = await QuestionServices.getQuestions(id)
            res.status(data.code).json({ event_id: id, ...data })
        } catch (e) {
            res.status(400).json({
                code: 400,
                message: 'Server Error',
                error: e.message,
            })
        }
    }

    async sendQuestion(req, res) {
        try {
            const { message, username } = req.body
            let jwtData
            let user

            try {
                jwtData = jwt.verify(
                    req.cookies.accessToken,
                    process.env.JWT_ACCES_SECRET,
                )
                user = await RegisterModel.findById(jwtData.id)
            } catch (e) {
                user = {
                    username,
                }
            }
            let data = {
                event_id: req.params.id,
                username: user ? user.username : message,
                message,
            }

            const question = await QuestionServices.sendQuestion(data)
            res.status(question.code).json(question)
        } catch (e) {
            res.status(400).json({
                code: 400,
                message: 'Internal Server Error',
                error: e.message,
            })
        }
    }

    async generateQuestion(req, res) {
        try {
            const event_id = req.params.id
            const user_id = jwt.verify(
                req.cookies.accessToken,
                process.env.JWT_ACCES_SECRET,
            ).id

            const questionData = await QuestionServices.generateQuestions(
                event_id,
                user_id,
            )
            res.status(questionData.code).json(questionData)
        } catch (e) {
            res.status(400).json({
                code: 400,
                message: 'Server Error',
                error: e.message,
            })
        }
    }
}

export default new QuestionController()
