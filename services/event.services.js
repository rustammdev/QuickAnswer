import EventModel from '../models/event.model.js';
import jwt from "jsonwebtoken";
import eventModel from "../models/event.model.js";

class EventService {
    async getEvent(id) {
        try {
            const  event = await EventModel.findById({_id: id});
           return  {status: 'success', code : 200, event_data : event}
        }catch (error) {
            return {status: 'fail',code : 404, message: 'Event not found', error : error.message};
        }
    }

    async getAllEvents(id) {
        try {
            const  event = await EventModel.find({created_by: id});
            return {status: 'success', code : 200, event_data : event}
        }catch (error) {
            return {status: 'fail', code : 404, message: 'Event not found', error : error.message};
        }
    }

    async createEvent(token, data) {
        try {
            const jwtData = jwt.decode(token, process.env.JWT_ACCES_SECRET);
            const  event = await EventModel.create({created_by : jwtData.id, ...data});
            return  {status: 'success', code : 201, message : 'Successfully created', eventId :event._id}
        }catch (error) {
            return {status: 'fail', code : 409, message: 'Event was not created', error : error.message};
        }
    }


    async deleteEvent(id) {
        try {

            await EventModel.deleteOne({_id: id});
            return  {status: 'success', code : 200, message : 'Event is deleted'}
        }catch (error) {
            return {status: 'error', code: 404, message: 'Event not found', error : error.message};
        }
    }

    async updateEvent(id, updateData) {
        try {
            // updateData ichidagi kalitlarni tekshirish
            const validKeys = ['event_name', "event_desc", "end_date", "moderators"];
            for (const key of Object.keys(updateData)) {
                if (!validKeys.includes(key)) {
                    return  {status : "fail", code : 400, message : `Invalid key: ${key}`}
                }
            }

            const result = await eventModel.updateOne({ _id : id },  { $set : updateData }, {new : true});

            if (result.matchedCount === 0) {
                return {status : "fail", code: 404, message: "Event not found." };
            }
            return { status: "ok", code: 200, message: "Event updated successfully."};
        } catch (error) {
            return {status : "error", code: 400, message: "Event doesn't updated", error: error.message  };
        }
    }


}

export default new EventService();