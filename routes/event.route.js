import EventController from '../controller/event.controller.js';
import authMiddleware from "../middleware/Auth.midlware.js";
import express from "express";
const router = express.Router();

// @desc Get all events
// @route Post '/v2/events'
// @access Only users
router.get("/event", authMiddleware, EventController.getAllEvents);

// @desc Get one Event
// @route Post '/v2/event/:id'
// @access Only users
router.get("/event/:id", authMiddleware, EventController.getEvent);

// @desc Create Event
// @route Post '/v2/event/create'
// @access Only users
router.post("/event", authMiddleware, EventController.createEvent);


// @desc Delete Event
// @route Post '/v2/event/:id'
// @access Only users
router.delete("/event/:id", authMiddleware, EventController.deleteEvent);


// @desc Update Event
// @route Post '/v2/event/:id'
// @access Only users
router.put("/event/:id", authMiddleware, EventController.updateEvent);

export default router;