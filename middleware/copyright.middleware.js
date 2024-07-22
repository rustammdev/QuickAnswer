import jwt from "jsonwebtoken";
import EventModel from "../models/event.model.js";

const CopyrightMiddleware = async (req, res, next) => {
    const eventId = req.params.id;
    const { id } = jwt.decode(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);

    const  event = await EventModel.findById({_id: eventId});

    if(!event){
        return res.status(404).json({status: 'fail', code :404, message : 'Event not found', type : 'error'});
    }
    if(id !== event.created_by.toString() && !(event.moderators.includes(`${id}`))){
        return res.status(409).json({status: 'fail', code :409, message : 'Attempting to delete information that does not belong to own', type: 'error'});
    }

   return next()
};

export default CopyrightMiddleware;