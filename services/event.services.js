import EventModel from '../models/event.model.js';
import jwt from "jsonwebtoken";

class EventService {
    async getEvent(id) {
        try {
            const  event = await EventModel.findById({_id: id})
            return  {status : 200, event : event, ok : true}
        }catch (error) {
            return {status : 404, error: 'Event not found', ok : false};
        }
    }

    async createEvent(token, data) {
        try {
            const jwtData = jwt.decode(token, process.env.JWT_ACCES_SECRET);
            const  event = await EventModel.create({created_by : jwtData.id, ...data});
            return  {status : 201, message : 'Successfully created', eventId :event._id,  ok : true}
        }catch (error) {
            return {status : 409, error: 'Event was not created' , ok : false};
        }
    }


    async deleteEvent(id) {
        try {
            const  event = await EventModel.findById({_id: id})
            if(!event){
                return  {status : 404, error : 'Event not found', ok : true}
            }
            await EventModel.deleteOne({_id: id});
            return  {status : 204, message : 'Event is deleted', ok : true}
        }catch (error) {
            return {status : 500, error: 'Some error', ok : false};
        }
    }
    async updateEvent(data) {
        // not found 404
        // return  {status : 200, message : 'Successfully updated', ok : true}
        // return  {status : 500, message : 'Successfully updated', ok : true}
    }
    async getQuestions(id) {
        // not found 404
        // return  {status : 200, message : 'Successfully updated', ok : true}
        // return  {status : 500, message : 'Successfully updated', ok : true}
    }
    async sendQuestion(id) {
        // return  {status : 200, message : 'Successfully updated', ok : true}
        // return  {status : 500, message : 'Successfully updated', ok : true}
    }
}

export default new EventService();