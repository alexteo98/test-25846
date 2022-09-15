import express from 'express'
import { getUserDetails, setUserDetails } from '../controller/controller.js'
let detailsRouter = express.Router();

detailsRouter.get('/', getUserDetails);
detailsRouter.put('/', setUserDetails)

export default detailsRouter;