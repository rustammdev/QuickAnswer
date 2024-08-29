import nodemailer from 'nodemailer'
import 'dotenv/config'
import VerifyModel from '../models/verify.model.js'
import jwt from 'jsonwebtoken'

class EmailService {
    async SendEmail(firstname, email, password) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            })
            const verifyToken = this.generateToken(firstname, email, password)
            const info = await transporter.sendMail({
                from: `"QuickAnswear Verification Link 👻" <${process.env.EMAIL}>`,
                to: `${email}`,
                subject: 'Hello ✔',
                text: 'Verify your email',
                html: `
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                    background-color: #f4f4f4;
                                    text-align: center;
                                }
                                .container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                h1 {
                                    color: #333333;
                                }
                                p {
                                    color: #555555;
                                }
                                .button {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    margin: 20px 0;
                                    font-size: 16px;
                                    color: #333333;
                                    background-color: #007bff;
                                    text-decoration: none;
                                    border-radius: 4px;
                                }
                                .footer {
                                    margin-top: 20px;
                                    font-size: 12px;
                                    color: #999999;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Verify Your Email</h1>
                                <p>Hi there,</p>
                                <p>Thank you for registering with QuickAnswear. Please click the button below to verify your email address:</p>
                                <a href="http://localhost:5173/verify/${verifyToken}" class="button">Verify Email</a>
                                <p>If you did not request this email, please ignore it.</p>
                                <div class="footer">
                                    <p>&copy; ${new Date().getFullYear()} QuickAnswear. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
            })

            await VerifyModel.findOneAndUpdate(
                { email },
                { email },
                { upsert: true, new: true, setDefaultsOnInsert: true },
            )

            return {
                status: 'success',
                code: 200,
                message: 'Verification link sended',
            }
        } catch (error) {
            return {
                status: 'error',
                code: 400,
                message: "Message doesn't sended",
                error: error.message,
            }
        }
    }

    generateToken(firstname, email, password) {
        const token = jwt.sign(
            { firstname, email, password },
            process.env.EMAIL_JWT_SECRET,
            {
                expiresIn: '1d',
            },
        )
        return token
    }

    async verifyCode(email) {
        try {
            const user = await VerifyModel.updateOne(
                { email },
                { $set: { isVerified: true } },
                { new: true },
            )

            if (!user) {
                return {
                    status: 'fail',
                    code: 400,
                    message: 'User not found',
                }
            }
            return {
                status: 'success',
                code: 400,
                message: 'Verification successful',
            }
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
                code: 400,
                message: 'Internal server error',
                path: '[email.service.js].verifyCode()',
            }
        }
    }
}

export default new EmailService()
