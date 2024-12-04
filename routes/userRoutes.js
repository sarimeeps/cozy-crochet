const express = require('express');
const controller = require('../controllers/userControllers');
const {isGuest, isLoggedIn} = require('../middleware/auth');

const router = express.Router();

//send html form for creating a new account
router.get('/new', isGuest, controller.new);

//create a new user account
router.post('/', isGuest, controller.create);

//send html for logging in
router.get('/login', isGuest, controller.getUserLogin); 

//authenticate user login
router.post('/login', isGuest, controller.login);

//send user profile page
router.get('/profile', isLoggedIn, controller.profile);

//logout a user
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;