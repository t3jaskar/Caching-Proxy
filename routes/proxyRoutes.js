const express = require('express');
const router = express.Router();
const proxyController = require('../controllers/proxyController');

// All proxy requests are handled by the controller
router.all('*', proxyController.handleProxyRequest);

module.exports = router;
