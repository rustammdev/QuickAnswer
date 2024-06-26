import { Router } from "express";
import LoginControl from "../controller/login.controller.js";
const route = Router();

// @desc Home
// @route POST '/register'
// @access Public
route.post("/", LoginControl);

export default route;