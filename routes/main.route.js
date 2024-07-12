import { Router } from "express";
import UserController from "../controller/user.controller.js";
const route = Router();

// @desc Home
// @route GET '/api'
// @access Public
route.get("/", UserController.home);

// @desc Login
// @route Post '/api/register'
// @access Public
route.post('/register', UserController.register)

export default route;
