import { Router } from "express";
import UserController from "../controller/user.controller.js";
import authMiddleware from "../middleware/Auth.midlware.js";
import {body} from "express-validator";
const route = Router();

// @desc Home
// @route GET '/api'
// @access Public
route.get("/", UserController.home);

const  validateUser = [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({min: 5}).withMessage("Please enter a valid password"),
]

// @desc Login
// @route Post '/api/register'
// @access Public
route.post('/register', validateUser, UserController.register);

// @desc Login
// @route Post '/api/login'
// @access Public
route.post('/login', validateUser, UserController.login);

// @desc Login
// @route Post '/api/login'
// @access Only users
route.post('/logout', authMiddleware, UserController.logout);

export default route;
