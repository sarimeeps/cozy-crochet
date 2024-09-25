const express = require('express');
const controller = require('../controllers/itemControllers');

const router = express.Router();

router.get('/', controller.display);

router.get('/new', controller.new);

router.get('/:id', controller.show);

module.exports = router;