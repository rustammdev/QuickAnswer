import { Router } from "express";
import { DeleteEventController } from "../controller/eventdelete.controller.js";
const route = Router();

// @desc Home
// @route POST '/event'
// @access Private
route.delete("/", DeleteEventController);

export default route;
