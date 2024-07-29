import QuestionServices from '../services/question.services.js'
import jwt from 'jsonwebtoken'

class EventController {
    async getQuestions (req, res) {
        try{
            const id = req.params.id
            const data = await QuestionServices.getQuestions(id);
            res.status(data.code).json({ ...data, id });
        }catch (e){
            res.status(400).json({code : 400, message: "Server Error", error : e.message});
        }
    }

    async sendQuestion (req, res) {
        try{
            const { message } = req.body
            const data = {
                event_id : req.params.id,
                sended : jwt.verify(req.cookies.accessToken, process.env.JWT_ACCES_SECRET).id,
                message,
            }
            const question = await QuestionServices.sendQuestion(data);
            res.status(question.code).json(question);
        }catch (e){
            res.status(400).json({code : 400, message: "Server Error", error : e.message});
        }
    }
}

export default new EventController();