// Ticketing routes

import express from 'express'
import { NOT_SUPPORTED_CODE } from '../constants.js';
import { createUser,deleteUser } from '../controller/controller.js'
let userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.delete('/', deleteUser );

// Set default API response
userRouter.all('/', function (req, res) {
    res.status(NOT_SUPPORTED_CODE).json();
});

// Export API routes
export default userRouter;
