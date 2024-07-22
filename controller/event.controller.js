import eventServices from "../services/event.services.js";
import jwt from "jsonwebtoken";

class EventController {
    async createEvent(req,res){
        const event = await  eventServices.createEvent(req.cookies.accessToken, req.body)
        res.status(event.code).json(event);
    }

    async getEvent(req,res){
        const id = req.params.id;
        const  event = await eventServices.getEvent(id)
        res.status(event.code).json(event);
    }

    async getAllEvents(req,res){
        const { id } = jwt.decode(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);
        const  events = await eventServices.getAllEvents(id)
        res.status(events.code).json(events);
    }

    async deleteEvent(req,res){
        const id = req.params.id;
        const event = await eventServices.deleteEvent(id);
        res.status(event.code).json(event);
    }

    async updateEvent(req, res){
       const id = req.params.id;
       const event = await eventServices.updateEvent(id, req.body)
       res.status(event.code).json(event);
    }
}

export default new EventController();