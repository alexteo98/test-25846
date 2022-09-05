// Filename: api-routes.js
// Initialize express router
import express from 'express'
let router = express.Router();
// Set default API response
router.get('/', function (req, res) {
    res.status(200)
        .json({
        message: 'Sample GET request'
    });
});

router.post('/', function (req, res) {
    res.status(200)
        .json({
        message: 'Sample POST request'
    });
});

router.put('/', function (req, res) {
    res.status(200)
        .json({
        message: 'Sample PUT request'
    });
});

router.delete('/', function (req, res) {
    res.status(200)
        .json({
        message: 'Sample DELETE request'
    });
});


// Export API routes
export default router;
