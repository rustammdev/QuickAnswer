import fs from 'fs'
import path from 'path'
import multer from 'multer'

// Multer storage konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/'
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }) // Papka yo'q bo'lsa, uni yaratadi
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // Fayl nomini o'zgartirish
    },
})
export const upload = multer({ storage: storage })
