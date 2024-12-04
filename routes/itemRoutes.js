const express = require('express');
const controller = require('../controllers/itemControllers');
const {isGuest, isLoggedIn, isSeller, validateId} = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.display);

// show new item page
router.get('/new', isLoggedIn, controller.new);

// show item details
router.get('/:id', validateId, controller.show);

// create a new item
router.post('/', isLoggedIn, controller.create);

// edit an item
router.get('/:id/edit', isLoggedIn, validateId, isSeller, controller.edit);

// update an item
router.put('/:id', isLoggedIn, validateId, isSeller, controller.update);

// delete an item
router.delete('/:id', isLoggedIn, validateId, isSeller, controller.delete);

module.exports = router;