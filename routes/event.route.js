import EventController from '../controller/event.controller.js';
import authMiddleware from "../middleware/Auth.midlware.js";
import express from "express";
const router = express.Router();


router.get("/d/:id", authMiddleware, EventController.createEvent);

export default router;