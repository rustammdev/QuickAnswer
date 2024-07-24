import { Router } from "express";
import UserController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import RegisterModel from "../models/register.model.js";
import {body} from "express-validator";
const route = Router();

// @desc Home
// @route GET '/api'
// @access Public
route.get("/", UserController.home);

const  validateUser = [
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9._]+$/).withMessage('Username must contain only letters, numbers, periods and underscores'),
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
