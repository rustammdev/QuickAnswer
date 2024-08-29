import { body } from 'express-validator'
export const validateUser = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password'),
]
export const validateRegister = [
    body('firstname')
        .isLength({ min: 3 })
        .withMessage('Firstname must be at least 3 characters long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Firstname contain only letters and spaces'),

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
