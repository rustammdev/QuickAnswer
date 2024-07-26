import QuestionServices from '../services/question.services.js'

class EventController {
    async getQuestions (req, res) {
        const data = await QuestionServices.getQuestions();
        res.status(data.code).json(data);
    }
}

export default new EventController();