import EventModel from '../models/event.model.js';
import RegisterModel from "../models/register.model.js";
import jwt from "jsonwebtoken";
import eventModel from "../models/event.model.js";

class EventService {
    async getEvent(id) {
        try {
           const  event = await EventModel.findById({_id: id});
           return  {status: 'success', code : 200, event}
        }catch (error) {
            return {status: 'fail',code : 404, message: 'Event not found', error : error.message};
        }
    }

    async getAllEvents(id) {
        try {
            const events = await EventModel.find({ created_by: id });
            const user = await RegisterModel.findById(id).populate('moderators'); // Populate moderators

            if (!user) {
                return { status: 'fail', code: 404, message: 'User not found' };
            }

            return { status: 'success', code: 200, events, moderators : user.moderators };
        } catch (error) {
            return { status: 'fail', code: 404, message: 'Event not found', error: error.message };
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

    async AddModeratorEvent(moderator, event_id) {
        try{
            const user = await RegisterModel.findById({ _id : moderator});
            if(user === null){
                return {status : "fail", code : 404, message : "User not found", moderator};
            }
            await RegisterModel.updateOne({ _id : moderator}, { $push : {moderators : event_id} });
            return  {status : 'success'}
        }catch (e) {
            return {status : "error", code : 500, message : "No data sent to moderators."}
        }
    }

    async updateEvent(id, updateData) {
        try {
            // Checking for keys in updateData
            const validKeys = ['event_name', "event_desc", "end_date", "moderators"];
            for (const key of Object.keys(updateData)) {
                if (!validKeys.includes(key)) {
                    return  {status : "fail", code : 400, message : `Invalid key: ${key}`}
                }
            }

            // Sort duplicate moderators id
            if (updateData.moderators) {
                updateData.moderators = [...new Set(updateData.moderators)];
            }

            // Send event id to moderators
            if (updateData.moderators) {
                for (const moderator of updateData.moderators) {
                    const result = await this.AddModeratorEvent(moderator, id);
                    if (result.status !== "success") {
                        return result
                    }
                }
            }

            const result = await eventModel.updateOne({ _id : id },  { $set : updateData }, {new : true});
            if (result.matchedCount === 0) {
                return {status : "fail", code: 404, message: "Event not found." };
            }
            return { status: "success", code: 200, message: "Event updated successfully."};
        } catch (error) {
            return {status : "error", code: 400, message: "Event doesn't updated", error: error.message  };
        }
    }


}

export default new EventService();