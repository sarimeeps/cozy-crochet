const express = require('express');
const controller = require('../controllers/itemControllers');

const router = express.Router();

router.get('/', controller.display);

module.exports = router;