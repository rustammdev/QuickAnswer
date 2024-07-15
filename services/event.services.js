import EventModel from '../models/event.model.js';
import jwt from "jsonwebtoken";

class EventService {
    async createEvent(token, data) {
        try {
            const jwtData = jwt.decode(token, process.env.JWT_ACCES_SECRET);
            const  event = await EventModel.create({created_by : jwtData.id, ...data});
            return  {...event}
        }catch (error) {
            return {message: error.message, ok : false};
        }
    }
}

export default new EventService();