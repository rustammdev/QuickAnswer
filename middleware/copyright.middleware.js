import jwt from "jsonwebtoken";
import EventModel from "../models/event.model.js";

const userIdFunc = (req) => {
    const { id } = jwt.verify(req.cookies.accessToken, process.env.JWT_ACCES_SECRET);
    return id
}

const CopyrightMiddleware = async (req, res, next) => {
    try{
        const eventId = req.params.id;
        let userId;

        try {
            userId = userIdFunc(req);
        } catch (error) {
            return res.status(401).json({
                status: 'fail',
                code: 401,
                message: 'Invalid or expired token',
                type: 'error'
            });
        }

        const  event = await EventModel.findById({_id: eventId})

        if(!event){
            return res.status(404).json({status: 'fail', code :404, message : 'Event not found', type : 'error'});
        }
        if(userId !== event.created_by.toString() && !(event.moderators.includes(`${userId}`))){
            return res.status(409).json({status: 'fail', code :409, message : 'Attempting to delete information that does not belong to own', type: 'error'});
        }

        req.userId = userId;
        req.event = event;
        next()
    }catch (e){
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal server error',
            type: 'error'
        });
    }
};

const DelCopyrightMiddleware = async (req, res, next) => {
    try {
        const { userId, event } = req;

        if (event.moderators.includes(userId)) {
            return res.status(403).json({status : "fail", code: 403, message: "Moderators are not allowed to delete the event."})
       }

        next()
    }catch(e){
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal server error',
            type: 'error',
            path : "Del Copy"
        });
    }
};

export {CopyrightMiddleware, DelCopyrightMiddleware};