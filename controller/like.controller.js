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
            const data = await likeService.SetLikes(
                questionId,
                req.body,
                jwtData.id,
            )
            res.status(data.code).json(data)
        } catch (e) {
            res.status(400).json({
                code: 400,
                message: 'Server Error',
                error: e.message,
            })
        }
    }
}

export default new LikeController()
