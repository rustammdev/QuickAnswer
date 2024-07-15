class EventController {
    async createEvent(req,res){
        res.status(200).send({message: 'Event created successfully.'});
    }
}

export default new EventController();