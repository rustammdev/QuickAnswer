import { Router } from "express";
import homeGetController from "../controller/home.controller.js";
const route = Router();

// @desc Home
// @route GET '/'
// @access Public
route.get("/", homeGetController);

export default route;
