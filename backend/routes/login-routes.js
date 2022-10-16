import express from 'express'
import { authUser } from '../controller/controller.js'
import { NOT_SUPPORTED_CODE } from '../constants.js'
let authRouter = express.Router();

authRouter.post('/', authUser);

authRouter.all('/', function (req, res) {
    res.status(NOT_SUPPORTED_CODE).json();
});

export default authRouter;