import { Router } from "express";
import UserController from "../controller/user.controller.js";
import {body} from "express-validator";
const route = Router();

// @desc Home
// @route GET '/api'
// @access Public
route.get("/", UserController.home);

// @desc Login
// @route Post '/api/register'
// @access Public
const  validateUser = [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({min: 5}).withMessage("Please enter a valid password"),
]
route.post('/register', validateUser, UserController.register);
route.post('/login', validateUser, UserController.login)

export default route;
