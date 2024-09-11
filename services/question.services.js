import QuestionsModel from '../models/questions.model.js'
import EventModel from '../models/event.model.js'
import GenerateQuestion from '../ai/open.ai.js'
import { io } from '../server.js'
import { clientSocketId } from '../server.js'

class QuestionServices {
    async getQuestions(id) {
        try {
            const questions = await QuestionsModel.find({
                event_id: id,
            })

            return {
                status: 'success',
                code: 200,
                message: 'All questions',
                questions,
            }
        } catch (e) {
            return { status: 'fail', code: 404, message: 'Event not found' }
        }
    }

    async sendQuestion(dataObj) {
        try {
            console.log(dataObj)
            const id = dataObj.sockedId
            try {
                await EventModel.findById({ _id: dataObj.event_id })
            } catch (e) {
                return { status: 'fail', code: 404, message: 'Event not found' }
            }

            const question = await QuestionsModel.create(dataObj)
            io.emit('new-question', question)

            return {
                status: 'success',
                code: 200,
                message: 'Question send successfully',
            }
        } catch (e) {
            io.to(clientSocketId[id]).io.emit('new-question', {
                status: 'error',
                code: 400,
                message: "Question doesn't send",
                error: e.message,
            })
            return {
                status: 'error',
                code: 400,
                message: "Question doesn't send",
                error: e.message,
            }
        }
    }

    async generateQuestions(event_id, user_id) {
        try {
            const questions = await QuestionsModel.find({ event_id })
            const formattedQuestions = questions.map((question) => ({
                message: question.message,
                username: question.username,
            }))

            // ai part
            const generateQuestions = new GenerateQuestion(formattedQuestions)
            const data = await generateQuestions.getData()
            console.log(data)

            await EventModel.updateOne(
                { _id: user_id },
                { $set: { filter_data: data } },
            )
            return { status: 'success', code: 200, questions: data }
        } catch (e) {
            return {
                status: 'error',
                code: 400,
                message: 'Generate questions error',
                error: e.message,
            }
        }
    }
}

export default new QuestionServices()
