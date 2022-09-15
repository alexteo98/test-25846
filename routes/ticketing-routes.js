// Ticketing routes

import express from 'express'
import { SAMPLE_DELETE_STRING, SAMPLE_GET_STRING, SAMPLE_POST_STRING, SAMPLE_PUT_STRING } from '../constants.js';
import { createUser,deleteUser } from '../controller/controller.js'
let userRouter = express.Router();

// Set default API response
userRouter.get('/', function (req, res) {
    res.status(200)
        .json({ message: SAMPLE_GET_STRING });
});

userRouter.post('/', createUser);

userRouter.put('/', function (req, res) {
    res.status(200)
        .json({ message: SAMPLE_PUT_STRING });
});

userRouter.delete('/', deleteUser );

userRouter.all('/', function (req, res) {
    res.status(405).json();
});

// Export API routes
export default userRouter;
