import UserModel from '../models/register.model.js'
import bcrypt from 'bcryptjs'
import tokenServices from './token.services.js'
import emailServices from './email.services.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

class UserServices {
    async registeration(fullname, username, email, password) {
        try {
            const condidate = await UserModel.findOne({ email })

            if (condidate) {
                return {
                    status: 'fail',
                    code: 409,
                    message: 'User already exist',
                }
            }

            // Verify email code
            emailServices.SendEmail(email).catch((err) => {
                console.error('Failed to send email:', err.message)
            })

            const tokens = tokenServices.tokengenerate({
                fullname,
                username,
                email,
                password,
            })

            return {
                refreshToken: tokens.refreshToken,
                status: 'success',
                code: 201,
                message: 'User created successfully.',
                accessToken: tokens.accessToken,
            }
        } catch (e) {
            return {
                status: 'error',
                code: 500,
                message: 'Failed to create user',
                error: e.message,
            }
        }
    }

    async verifyUser(payload, code) {
        try {
            const userdata = await jwt.verify(
                payload,
                process.env.REFRESH_SECRET_KEY,
            )

            const verify = await emailServices.verifyCode(userdata.email, code)

            if (verify.status === 'success') {
                // User mavjudligini tekshirish
                const existingUser = await UserModel.findOne({
                    email: userdata.email,
                })
                if (existingUser) {
                    return {
                        status: 'error',
                        code: 409, // Conflict
                        message: 'User already exists with this email',
                    }
                }

                const hash = await bcrypt.hash(userdata.password, 10)
                const user = await UserModel.create({
                    fullname: userdata.fullname,
                    username: userdata.username,
                    email: userdata.email,
                    password: hash,
                })

                const tokens = tokenServices.tokengenerate({
                    username: userdata.username,
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
                message: 'Failed to create user',
                error: e.message,
            }
        }
    }

    async login(identifier, password) {
        try {
            // Email formatini tekshirish uchun regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            let user
            if (emailRegex.test(identifier)) {
                user = await UserModel.findOne({ email: identifier })
            } else {
                user = await UserModel.findOne({ username: identifier })
            }

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
