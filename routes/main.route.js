import { Router } from 'express'
import UserController from '../controller/user.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'
import tokenServices from '../services/token.services.js'
import { validateRegister, validateUser } from '../validators/validates.js'
const route = Router()

// @desc Home
// @route GET '/api'
// @access Public
route.get('/', UserController.home)

// @desc Login
// @route Post '/api/register'
// @access Public
route.post('/register', validateRegister, UserController.register)
route.post('/verify/:token', UserController.verify)

// @desc Login
// @route Post '/api/login'
// @access Public
route.post('/login', validateUser, UserController.login)

// @desc Login
// @route Post '/api/login'
// @access Only users
route.post('/logout', AuthMiddleware, UserController.logout)

route.post('/update-cookie', UserController.updateCokies)

route.get('/auth/check', AuthMiddleware, async (req, res) => {
    res.json({ authenticated: true })
})

export default route
