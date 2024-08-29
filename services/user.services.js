import UserModel from '../models/register.model.js'
import bcrypt from 'bcryptjs'
import tokenServices from './token.services.js'
import emailServices from './email.services.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

class UserServices {
    async registeration(firstname, email, password) {
        try {
            const condidate = await UserModel.findOne({ email })

            if (condidate) {
                return {
                    status: 'fail',
                    email: true,
                    code: 409,
                    message: 'Registered with this email!',
                }
            }

            // Verify email code
            const sendEmail = await emailServices.SendEmail(
                firstname,
                email,
                password,
            )

            return sendEmail
        } catch (e) {
            return {
                status: 'error',
                code: 500,
                message: 'Failed to create user',
                error: e.message,
            }
        }
    }

    async verifyUser(payload) {
        try {
            const verify = await emailServices.verifyCode(payload.email)

            if (verify.status === 'success') {
                const hash = await bcrypt.hash(payload.password, 10)
                const user = await UserModel.create({
                    firstname: payload.firstname,
                    email: payload.email,
                    password: hash,
                })

                const tokens = tokenServices.tokengenerate({
                    username: user.username,
                    id: user._id,
                })
                await tokenServices.saveToken(user._id, tokens.refreshToken)
                return { ...verify, ...tokens }
            }
            return { ...verify }
        } catch (e) {
            return {
                status: 'error',
                code: 500,
                message: 'Failed to verify user',
                error: e.message,
            }
        }
    }

    async login(email, password) {
        try {
            const user = await UserModel.findOne({ email })

            if (!user) {
                return { status: 'fail', code: 404, message: 'User not found' }
            }

            const isPassEquel = await bcrypt.compare(password, user.password)
            if (!isPassEquel) {
                return {
                    status: 'fail',
                    code: 400,
                    message: 'Invalid Password',
                }
            }

            const tokens = tokenServices.tokengenerate({
                username: user.username,
                id: user._id,
            })
            await tokenServices.saveToken(user._id, tokens.refreshToken)

            return {
                status: 'success',
                code: 200,
                message: 'User login.',
                ...tokens,
            }
        } catch (e) {
            return {
                status: 'error',
                code: 400,
                message: 'Some error',
                error: e.message,
            }
        }
    }

    async logout(refreshToken) {
        try {
            const data = await tokenServices.deleteToken(refreshToken)
            return { status: 'success', code: 200, ...data }
        } catch (e) {
            return {
                status: 'error',
                code: 400,
                message: 'Some error',
                error: e.message,
            }
        }
    }
}

export default new UserServices()
