const express = require('express');
const controller = require('../controllers/itemControllers');

const router = express.Router();

router.get('/', controller.display);

router.get('/new', controller.new);

module.exports = router;