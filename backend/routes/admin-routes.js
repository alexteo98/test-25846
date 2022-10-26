import express from 'express'
import { getUsers } from '../controller/admin-controller.js';
import { NOT_SUPPORTED_CODE } from '../constants.js'
import { authAdmin, allow } from './middleware.js'
let adminRouter = express.Router();


adminRouter.get('/', authAdmin, getUsers)

adminRouter.all('/', function (req, res) {
    res.status(NOT_SUPPORTED_CODE).json();
});

export default adminRouter;