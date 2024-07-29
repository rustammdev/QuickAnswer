import QuestionsModel from '../models/questions.model.js'
import EventModel from '../models/event.model.js'
import RegisterModel from '../models/register.model.js'

class QuestionServices{
    async getQuestions(id){
        try{
            const questions = await QuestionsModel.find({event_id : id});
            return {status : "success", code : 200, message : "All questions", questions};
        }catch (e){
            return {status : "fail", code : 404, message : "Event not found"};
        }
    }

    async sendQuestion(dataObj){
        try{
            try{
                const event = await EventModel.findById(dataObj.event_id);
                console.log(event)

            }catch (e){
                return {status : "fail", code : 404, message : "Event not found"};
            }

            await QuestionsModel.create(dataObj)
            return {status : "success", code : 200, message : "Question send successfully"};
        }catch (e){
            return ({status : "error", code : 400, message: "Question doesn't send", error : e.message});
        }
    }
}


export  default  new QuestionServices()