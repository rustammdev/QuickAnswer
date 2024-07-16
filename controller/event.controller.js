import eventServices from "../services/event.services.js";
import jwt from "jsonwebtoken";

class EventController {
    async createEvent(req,res){
        const event = await  eventServices.createEvent(req.cookies.accessToken, req.body)
        res.status(event.status).json({...event});
    }

    async getEvent(req,res){
        const event_id = req.params.id;
        const { id } = jwt.decode(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);

        const  event = await eventServices.getEvent(id, event_id)
        res.status(event.status).json({...event});
    }

    async getAllEvents(req,res){
        const { id } = jwt.decode(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);
        const  events = await eventServices.getAllEvents(id)
        res.status(events.status).json({...events});
    }

    async deleteEvent(req,res){
        const event_id = req.params.id;
        const { id } = jwt.decode(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);

        const event = await eventServices.deleteEvent(event_id, id);
        res.status(event.status).json({...event, ok: true});
    }
}

export default new EventController();