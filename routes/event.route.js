import EventController from '../controller/event.controller.js';
import authMiddleware from "../middleware/Auth.midlware.js";
import express from "express";
const router = express.Router();


router.post("/event/create", authMiddleware, EventController.createEvent);
router.get("/event/:id", authMiddleware, EventController.getEvent);

export default router;