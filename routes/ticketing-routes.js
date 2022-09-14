// Ticketing routes

import express from 'express'
import { SAMPLE_DELETE_STRING, SAMPLE_GET_STRING, SAMPLE_POST_STRING, SAMPLE_PUT_STRING } from '../constants.js';
import { createUser } from '../controller/controller.js'
let router = express.Router();

// Set default API response
router.get('/', function (req, res) {
    res.status(200)
        .json({ message: SAMPLE_GET_STRING });
});

router.post('/', createUser);

router.put('/', function (req, res) {
    res.status(200)
        .json({ message: SAMPLE_PUT_STRING });
});

router.delete('/', function (req, res) {
    res.status(200)
        .json({ message: SAMPLE_DELETE_STRING });
});


router.all('/', function (req, res) {
    res.status(405).json();
});

// Export API routes
export default router;
