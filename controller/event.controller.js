import EventServices from "../services/event.services.js";
import eventServices from "../services/event.services.js";

class EventController {
    async createEvent(req,res){
        const event = await  eventServices.createEvent(req.cookies.accessToken, req.body)
        res.status(200).json({ ok : true, message : 'Successfully created'});
    }
}

export default new EventController();