import express from 'express'
import cors from 'cors'
import AuthRoute from './src/v1/route/auth.router.js'
import PostRoute from './src/v1/route/postRoute.js'
import ProfileRoute from './src/v1/route/profileRoute.js'
import morgan from 'morgan'

const app = express()

// Middleware
app.use(express.json())
app.use(morgan('combined'))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Routes
app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/post', PostRoute)
app.use('/api/v1/profile', ProfileRoute)

// Testing API
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

export default app