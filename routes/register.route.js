import { Router } from "express";
import RegisterControl from "../controller/register.controller.js";
const route = Router();

// @desc Home
// @route GET '/register'
// @access Public
route.post("/", RegisterControl);

export default route;
