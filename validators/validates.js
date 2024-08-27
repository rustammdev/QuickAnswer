import { body } from 'express-validator'
export const validateUser = [
    body('identifier')
        .isLength({ min: 3 })
        .withMessage('Not valid username or email')
        .custom((value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const usernameRegex = /^[a-zA-Z0-9._]+$/

            if (!emailRegex.test(value) && !usernameRegex.test(value)) {
                throw new Error('Not valid username or email')
            }
            return true
        }),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password'),
]
export const validateRegister = [
    body('fullname')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name must contain only letters and spaces'),

    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9._]+$/)
        .withMessage(
            'Username must contain only letters, numbers, dots, or underscores',
        ),

    body('email').isEmail().withMessage('Please enter a valid email'),

    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),
]

// validations
export const validateEvent = [
    body('end_date')
        .isISO8601()
        .withMessage('End date must be in the format YYYY-MM-DD')
        .toDate() // Sana formatini to'g'ri sana formatiga o'zgartiradi
        .custom((value) => {
            const today = new Date()
            if (value <= today) {
                throw new Error('End date must be in the future')
            }
            return true
        }),
]
