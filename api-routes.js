// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.status(200)
    json({
        status: 'API is Working',
        message: 'Sample GET request'
    });
});

router.post('/', function (req, res) {
    res.status(200)
    .json({
        status: 'API is Working',
        message: 'Sample POST request'
    });
});

// Export API routes
module.exports = router;
