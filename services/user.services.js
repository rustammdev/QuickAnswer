import UserModel from '../models/register.model.js'
import bcrypt from 'bcryptjs'
import tokenServices from './token.services.js'
import emailServices from './email.services.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { io } from '../server.js'

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

                // username ni yaratish
                let username = payload.firstname
                    .toLowerCase()
                    .replace(/\s+/g, '')
                let isUnique = false
                let counter = 0

                while (!isUnique) {
                    const tempUsername =
                        counter === 0 ? username : `${username}${counter}`
                    const existingUser = await UserModel.findOne({
                        username: tempUsername,
                    })
                    if (!existingUser) {
                        username = tempUsername
                        isUnique = true
                    } else {
                        counter++
                    }
                }

                const user = await UserModel.findOneAndUpdate(
                    { email: payload.email },
                    {
                        firstname: payload.firstname,
                        username,
                        email: payload.email,
                        password: hash,
                    },
                    {
                        upsert: true, // Hujjat topilmasa, yangi hujjat yaratish
                        new: true,
                        setDefaultsOnInsert: true,
                    },
                )
                const userdata = jwt.sign(
                    { username: user.username, id: user._id },
                    process.env.USER_DATA,
                )

                return {
                    token: userdata,
                    userData: { username: user.username, id: user._id },
                    status: 'success',
                    success: true,
                    code: 200,
                }
            }
            return { ...verify }
        } catch (e) {
            console.log(e.message)
            return {
                status: 'error',
                success: false,
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
                username: user.username,
                id: user._id,
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
