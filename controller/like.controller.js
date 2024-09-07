import QuestionServices from '../services/question.services.js'
import likeService from '../services/like.service.js'
import jwt from 'jsonwebtoken'

class LikeController {
    async SetLikes(req, res) {
        try {
            const questionId = req.params.id
            const jwtData = jwt.decode(
                req.cookies.accessToken,
                process.env.JWT_ACCES_SECRET,
            )
            const data = await likeService.SetLikes(questionId, jwtData.id)
            console.log(req.body)
            res.status(data.code).json(data)
        } catch (e) {
            res.status(400).json({
                code: 400,
                status: 'error',
                message: e.message,
            })
        }
    }

    async SetUnLikes(req, res) {
        try {
            const questionId = req.params.id
            const jwtData = jwt.decode(
                req.cookies.accessToken,
                process.env.JWT_ACCES_SECRET,
            )

            const data = await likeService.SetUnLikes(questionId, jwtData.id)
            res.status(data.code).json(data)
        } catch (e) {
            res.status(400).json({
                code: 400,
                status: 'error',
                message: e.message,
            })
        }
    }
}

export default new LikeController()
