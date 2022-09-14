import { HELLO_WORLD_STRING } from './constants.js';
import express from 'express'
import ticketingRoutes from './routes/ticketing-routes.js'
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(HELLO_WORLD_STRING)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Use Api routes in the App
app.use('/ticketing/api', ticketingRoutes)

export default app
