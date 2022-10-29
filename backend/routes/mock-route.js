import express from 'express'
import { getMockData } from '../controller/mock-data-controller.js';
import { NOT_SUPPORTED_CODE } from '../constants.js'
let mockRouter = express.Router();

mockRouter.get('/', getMockData);

mockRouter.all('/', function (req, res) {
    res.status(NOT_SUPPORTED_CODE).json();
});

export default mockRouter;