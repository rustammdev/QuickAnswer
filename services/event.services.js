import EventModel from '../models/event.model.js';
import jwt from "jsonwebtoken";

class EventService {
    async getEvent(user_id, event_id) {
        try {
            const  event = await EventModel.findById({_id: event_id});

            if(user_id !== event.created_by.toString()){
                return  {status: 'no', code :409, error : 'Attempting to obtain information that does not belong to own'}
            }
           return  {status: 'ok', code : 200, event_data : event}
        }catch (error) {
            return {status: 'no', code : 404, error: 'Event not found'};
        }
    }

    async getAllEvents(id) {
        try {
            const  event = await EventModel.find({created_by: id});
            return {status: 'ok', code : 200, event_data : event}
        }catch (error) {
            return {status: 'no', code : 404, error: 'Event not found'};
        }
    }

    async createEvent(token, data) {
        try {
            const jwtData = jwt.decode(token, process.env.JWT_ACCES_SECRET);
            const  event = await EventModel.create({created_by : jwtData.id, ...data});
            return  {status: 'ok', code : 201, message : 'Successfully created', eventId :event._id}
        }catch (error) {
            return {status: 'no', code : 409, error: 'Event was not created'};
        }
    }


    async deleteEvent(event_id, user_id) {
        try {
            const  event = await EventModel.findById({_id: event_id});
            if(user_id !== event.created_by.toString()){
                return  {status: 'no', code :409, error : 'Attempting to delete information that does not belong to own'}
            }
            const delEvent = await EventModel.deleteOne({_id: event_id});
            return  {status: 'ok', code : 200, message : 'Event is deleted'}
        }catch (error) {
            console.log(error.message)
            return {status: 'no', code: 404, error: 'Event not found'};
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