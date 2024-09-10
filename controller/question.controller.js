import QuestionServices from '../services/question.services.js'
import RegisterModel from '../models/register.model.js'
import tokenservice from '../services/token.services.js'

class QuestionController {
    async getQuestions(req, res) {
        try {
            const id = req.params.id
            const data = await QuestionServices.getQuestions(id)

            res.status(data.code).json({
                event_id: id,
                ...data,
                userId: req.userId ? req.userId : '0',
            })
        } catch (e) {
            res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Server Error',
                error: e.message,
            })
        }
    }

    async sendQuestion(req, res) {
        try {
            const question = await QuestionServices.sendQuestion(
                req.body,
                req.params.id,
            )
            res.status(question.code).json(question)
        } catch (e) {
            res.status(400).json({
                code: 400,
                status: 'error',
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
                status: 'error',
                message: 'Server Error',
                error: e.message,
            })
        }
    }
}

export default new QuestionController()
