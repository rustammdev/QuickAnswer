import { Router } from "express";
import { dashboardController } from "../controller/dashboard.controller.js";
const route = Router();

// @desc Home
// @route POST '/event'
// @access Private
route.get("/", dashboardController);

export default route;