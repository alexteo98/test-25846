import { HELLO_WORLD_STRING } from './constants.js';
import express from 'express'
import apiRoutes from './api-routes.js'
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(HELLO_WORLD_STRING)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Use Api routes in the App
app.use('/api', apiRoutes)

export default app
