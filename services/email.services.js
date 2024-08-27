import nodemailer from 'nodemailer'
import 'dotenv/config'
import VerifyModel from '../models/verify.model.js'

class EmailService {
    async SendEmail(email) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            })
            const resetCode = this.generateResetCode()
            const info = await transporter.sendMail({
                from: `"QuickAnswear Verification code 👻" ${process.env.EMAIL}`,
                to: `${email}`,
                subject: 'Hello ✔',
                text: `${resetCode}`,
            })

            const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
            await VerifyModel.create({
                email,
                code: resetCode,
                expiresAt,
            })

            return {
                status: 'success',
                message: 'Message sent',
                infoMessage: info.messageId,
            }
        } catch (error) {
            return {
                status: 'error',
                message: "Message doesn't sended",
                error: error.message,
            }
        }
    }

    generateResetCode() {
        const min = 100000
        const max = 999999
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    async verifyCode(email, inputCode) {
        const record = await VerifyModel.findOne({ email: email })
        console.log(record, inputCode);
        
        if (!record) {
            return {
                status: 'fail',
                code: 400,
                message: 'Verify Code not found.',
            }
        }

        if (record.expiresAt < new Date()) {
            return {
                status: 'fail',
                code: 400,
                message: 'Verify Code has expired',
            }
        }

        if (record.code == inputCode) {
            return {
                status: 'success',
                code: 200,
                message: 'Verification successful',
            }
        }
        return {
            status: 'fail',
            code: 400,
            message: 'Incorrect verify code',
        }
    }
}

export default new EmailService()
