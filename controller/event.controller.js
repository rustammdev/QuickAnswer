import eventServices from '../services/event.services.js'
import questionServices from '../services/question.services.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

class EventController {
    async createEvent(req, res) {
        if (!req.file) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'Fayl yuklanmadi' })
        }
        const data = {
            event_name: req.body['eventname'],
            event_desc: req.body['eventdesc'],
            imageUrl: `http://localhost:7000/uploads/${req.file.filename}`,
            end_date: req.body['end_date'],
        }

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ code: 400, message: errors.array() })
        }

        const event = await eventServices.createEvent(
            req.cookies.accessToken,
            data,
        )
        res.status(event.code).json(event)
    }

    async getEvent(req, res) {
        const id = req.params.id
        const event = await eventServices.getEvent(id)
        res.status(event.code).json(event)
    }

    // global
    async globalEvents(req, res) {
        const events = await eventServices.globalEvents()
        res.status(events.code).json(events)
    }

    async getAllEvents(req, res) {
        const { id } = jwt.decode(
            req.cookies.accessToken,
            process.env.JWT_ACCES_SECRET,
        )
        const events = await eventServices.getAllEvents(id)
        res.status(events.code).json(events)
    }

    async deleteEvent(req, res) {
        const id = req.params.id
        const event = await eventServices.deleteEvent(id)
        res.status(event.code).json(event)
    }

    async updateEvent(req, res) {
        const id = req.params.id
        const event = await eventServices.updateEvent(id, req.body)
        res.status(event.code).json(event)
    }
}

export default new EventController()
