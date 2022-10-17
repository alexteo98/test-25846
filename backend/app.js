import { HELLO_WORLD_STRING } from './constants.js';
import express from 'express'
import cors from 'cors';
import userRoutes from './routes/users-routes.js'
import detailsRouter from './routes/details-routes.js';
import authRouter from './routes/login-routes.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 8080
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
  res.send(HELLO_WORLD_STRING)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Use Api routes in the App
app.use('/users', userRoutes)
app.use('/details', detailsRouter)

export default app
