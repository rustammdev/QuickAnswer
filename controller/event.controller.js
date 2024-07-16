import EventServices from "../services/event.services.js";
import eventServices from "../services/event.services.js";

class EventController {
    async createEvent(req,res){
        const event = await  eventServices.createEvent(req.cookies.accessToken, req.body)
        res.status(event.status).json({...event});
    }

    async getEvent(req,res){
        const id = req.params.id;
        const  event = await eventServices.getEvent(id)
        res.status(event.status).json({...event});
    }
    // async deleteEvent(req,res){
    //     const  { id } = req.body;
    //     const event = await  eventServices.deleteEvent(id)
    // }
}

export default new EventController();