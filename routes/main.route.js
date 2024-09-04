import { Router } from 'express'
import UserController from '../controller/user.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
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
route.get('/verify/:token', UserController.verify)

// @desc Login
// @route Post '/api/login'
// @access Public
route.post('/login', validateUser, UserController.login)

// @desc Login
// @route Post '/api/login'
// @access Only users
route.post('/logout', authMiddleware, UserController.logout)

route.post('/update-cookie', UserController.updateCokies)

route.get('/auth/check', authMiddleware, async (req, res) => {
    console.log('ishladi-auth-check')
    const { accessToken } = req.cookies
    if (accessToken) {
        const userData = await tokenServices.validateAccess(accessToken)
        if (userData) {
            return res.json({ authenticated: true })
        }
    }
    res.json({ authenticated: true })
})

export default route
