import QuestionsModel from '../models/questions.model.js'
import EventModel from '../models/event.model.js'
import GenerateQuestion from "../ai/open.ai.js"

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
                await EventModel.findById(dataObj.event_id);
            }catch (e){
                return {status : "fail", code : 404, message : "Event not found"};
            }

            await QuestionsModel.create(dataObj)
            return {status : "success", code : 200, message : "Question send successfully"};
        }catch (e){
            return ({status : "error", code : 400, message: "Question doesn't send", error : e.message});
        }
    }

    async generateQuestions(event_id, user_id){
        try {
            const questions = await QuestionsModel.find({event_id});
            const formattedQuestions = questions.map(question => ({
                message: question.message,
                username: question.username
            }));

            // ai part
            const generateQuestions = new GenerateQuestion(formattedQuestions);
            const data = await generateQuestions.getData();
            console.log(data);

            await EventModel.updateOne({ _id : user_id}, { $set : {filter_data : data} });
            return {status : "success", code : 200, questions: data};
        } catch (e) {
            return ({status : "error", code : 400, message: "Generate questions error", error : e.message});

        }
    }
}


export  default  new QuestionServices()