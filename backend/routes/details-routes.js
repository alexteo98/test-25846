import express from 'express'
import { getUserDetails, setUserDetails } from '../controller/controller.js'
import { NOT_SUPPORTED_CODE } from '../constants.js'
let detailsRouter = express.Router();

detailsRouter.get('/', getUserDetails);
detailsRouter.put('/', setUserDetails);

detailsRouter.all('/', function (req, res) {
    res.status(NOT_SUPPORTED_CODE).json();
});

export default detailsRouter;