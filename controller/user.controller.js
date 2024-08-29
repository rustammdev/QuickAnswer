import userServices from '../services/user.services.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

class UserController {
    async home(req, res) {
        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'This is the home route',
        })
    }

    // register
    async register(req, res) {
        try {
            const { firstname, email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    status: 'error',
                    message: errors.array()[0].msg,
                })
            }

            let user = await userServices.registeration(
                firstname,
                email,
                password,
            )

            const { refreshToken, ...newUser } = user
            res.status(user.code).json(newUser)
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, status: 'error', message: e.message })
        }
    }

    async verify(req, res) {
        try {
            // const { verify } = req.body
            // const { userData } = req.cookies
            const { token } = req.params
            const user_data = jwt.verify(token, process.env.EMAIL_JWT_SECRET)

            const user = await userServices.verifyUser(user_data)

            if (user.status == 'success') {
                res.cookie('accessToken', user.accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                })
                res.cookie('refreshToken', user.refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    secure: false,
                    path: '/',
                    sameSite: 'Lax',
                })
            }

            return res.status(user.code).json({ ...user })
        } catch (error) {
            return res
                .status(400)
                .json({ code: 400, status: 'error', message: error.message })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    status: 'fail',
                    message: errors.array()[0].msg,
                })
            }

            const user = await userServices.login(email, password)
            if (user.status == 'success') {
                res.cookie('accessToken', user.accessToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                })
                res.cookie('refreshToken', user.refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    secure: false,
                    path: '/',
                    sameSite: 'Lax',
                })
            }

            const { refreshToken, ...newUser } = user
            res.status(user.code).json({ status: 'success', ...newUser })
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, status: 'error', message: e.message })
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                return res
                    .status(404)
                    .json({ code: 404, message: 'Token not found' })
            }
            const user = await userServices.logout(refreshToken)

            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            res.status(user.code).json(user)
        } catch (e) {
            return res.status(400).json({ code: 400, message: e.message })
        }
    }
}

export default new UserController()
