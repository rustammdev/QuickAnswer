import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename)
// route
import MainRoute from './routes/main.route.js'
import EventRoute from './routes/event.route.js'
import QuestionRoute from './routes/question.route.js'

const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
    path: '/api/socket.io',
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})

// Statik fayllar uchun serverni sozlash
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

export let clientSocketId = {}
io.on('connection', (socket) => {
    console.log('Backend: New connection established')

    socket.on('userId', (userId) => {
        console.log(`Received user ID: ${userId}`)
        clientSocketId[userId] = socket.id
        console.log(clientSocketId)
    })

    socket.on('disconnect', () => {
        console.log('Backend: Connection closed')

        // userId orqali socket id ni o'chirish
        for (let userId in clientSocketId) {
            if (clientSocketId[userId] === socket.id) {
                delete clientSocketId[userId]
                break
            }
        }
    })
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.use('/api', MainRoute)
app.use('/api', EventRoute)
app.use('/api', QuestionRoute)

const PORT = process.env.PORT || 7002
const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGO_URL)
            .then(() => console.log('Database is connected'))

        server.listen(PORT, () =>
            console.log(`Server running on Port: http://localhost:${PORT}/api`),
        )
    } catch (error) {
        console.log(error)
    }
}

await start()
