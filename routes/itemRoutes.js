const express = require('express');
const controller = require('../controllers/itemControllers');

const router = express.Router();

router.get('/', controller.display);

// show new item page
router.get('/new', controller.new);

// show item details
router.get('/:id', controller.show);

// create a new item
router.post('/', controller.create);

module.exports = router;