import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

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
io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
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
