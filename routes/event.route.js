import EventController from '../controller/event.controller.js';
import { body } from "express-validator"
import express from "express";
const router = express.Router();

// middleware
import authMiddleware from "../middleware/auth.middleware.js";
import {CopyrightMiddleware, DelCopyrightMiddleware} from "../middleware/copyright.middleware.js";

// validations
const validateEvent = [
    body('end_date')
        .isISO8601().withMessage('End date must be in the format YYYY-MM-DD')
        .toDate() // Sana formatini to'g'ri sana formatiga o'zgartiradi
        .custom(value => {
            const today = new Date();
            if (value <= today) {
                throw new Error('End date must be in the future');
            }
            return true;
        }),
];


// @desc Get all events
// @route Post '/v2/events'
// @access Only users and moderators
router.get("/event", authMiddleware, EventController.getAllEvents)
    // @desc Get one Event
    // @route Post '/v2/event/:id'
    // @access Only users and moderators
    .get("/event/:id", authMiddleware, CopyrightMiddleware, EventController.getEvent)
    // @desc Create Event
    // @route Post '/v2/event/create'
    // @access Only users
    .post("/event", authMiddleware, validateEvent, EventController.createEvent)
    // @desc Delete Event
    // @route Post '/v2/event/:id'
    // @access Only users
    .delete("/event/:id", authMiddleware, CopyrightMiddleware, DelCopyrightMiddleware, EventController.deleteEvent)
    // @desc Update Event
    // @route Post '/v2/event/:id'
    // @access Only users and moderators
    .put("/event/:id", authMiddleware, CopyrightMiddleware, EventController.updateEvent)

export default router;