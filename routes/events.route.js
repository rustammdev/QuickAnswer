import { Router } from "express";
// import homeGetController from "../controller/home.controller.js";
import { CreateEvent } from "../controller/events.controller.js";
const route = Router();

// @desc Home
// @route POST '/event'
// @access Private
route.post("/", CreateEvent);

export default route;
