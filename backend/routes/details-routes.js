import express from 'express'
import { getUserDetails, setUserDetails, getUserSet } from '../controller/controller.js'
import { NOT_SUPPORTED_CODE } from '../constants.js'
let detailsRouter = express.Router();

detailsRouter.post('/', getUserDetails);
detailsRouter.put('/', setUserDetails);
detailsRouter.get('/', getUserSet)

detailsRouter.all('/', function (req, res) {
    res.status(NOT_SUPPORTED_CODE).json();
});

export default detailsRouter;