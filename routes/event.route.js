import EventController from '../controller/event.controller.js';
import express from "express";
const router = express.Router();

// middleware
import authMiddleware from "../middleware/auth.middleware.js";
import copyrightMiddleware from "../middleware/copyright.middleware.js";

// @desc Get all events
// @route Post '/v2/events'
// @access Only users
router.get("/event", authMiddleware, EventController.getAllEvents);

// @desc Get one Event
// @route Post '/v2/event/:id'
// @access Only users
router.get("/event/:id", authMiddleware, copyrightMiddleware, EventController.getEvent);

// @desc Create Event
// @route Post '/v2/event/create'
// @access Only users
router.post("/event", authMiddleware, EventController.createEvent);


// @desc Delete Event
// @route Post '/v2/event/:id'
// @access Only users
router.delete("/event/:id", authMiddleware, copyrightMiddleware,EventController.deleteEvent);


// @desc Update Event
// @route Post '/v2/event/:id'
// @access Only users
router.put("/event/:id", authMiddleware, EventController.updateEvent);

export default router;