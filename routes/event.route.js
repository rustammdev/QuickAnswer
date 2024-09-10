import EventController from '../controller/event.controller.js'
import { validateEvent } from '../validators/validates.js'
import express from 'express'
const router = express.Router()

// middleware
import { AuthMiddleware } from '../middleware/auth.middleware.js'
import {
    CopyrightMiddleware,
    DelCopyrightMiddleware,
} from '../middleware/copyright.middleware.js'

router
    // Global
    .get('/events', EventController.globalEvents)
    .get('/events/:id', EventController.getEvent)
    // @desc Get all events
    // @route Post '/v2/events'
    // @access Only users and moderators
    .get('/event', AuthMiddleware, EventController.getAllEvents)
    // @desc Get one Event
    // @route Post '/v2/event/:id'
    // @access Only users and moderators
    .get(
        '/event/:id',
        AuthMiddleware,
        CopyrightMiddleware,
        EventController.getEvent,
    )
    // @desc Create Event
    // @route Post '/v2/event/create'
    // @access Only users
    .post('/event', AuthMiddleware, validateEvent, EventController.createEvent)
    // @desc Delete Event
    // @route Post '/v2/event/:id'
    // @access Only users
    .delete(
        '/event/:id',
        AuthMiddleware,
        CopyrightMiddleware,
        DelCopyrightMiddleware,
        EventController.deleteEvent,
    )
    // @desc Update Event
    // @route Post '/v2/event/:id'
    // @access Only users and moderators
    .put(
        '/event/:id',
        AuthMiddleware,
        CopyrightMiddleware,
        EventController.updateEvent,
    )

export default router
