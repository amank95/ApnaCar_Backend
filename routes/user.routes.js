
// Import express to create routes
const express = require('express');
// Create a new router instance
const router = express.Router();

// Import body from express-validator for input validation
const { body } = require('express-validator');

// Import user controller to handle user-related logic
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// Route to register a new user
router.post('/register', [
    // Validate email format
    body('email').isEmail().withMessage('Invalid Email'),
    // Validate first name length
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    // Validate password length
    body('password').isLength({ min: 6 }).withMessage('password must be at least 5 charachters long')
], userController.registerUser)

//Route to login
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password Invalid')
], userController.loginUser)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

// Export the router to be used in other parts of the app
module.exports = router;