
// Import user model for database operations
const userModel = require('../models/user.model');

// Import user service for business logic
const userService = require('../services/user.service');

// Import validationResult to handle validation errors
const { validationResult } = require('express-validator');


// Controller function to handle user registration
module.exports.registerUser = async (req, res, next) => {
   // Check for validation errors from express-validator
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      // If errors exist, return 400 Bad Request with error details
      return res.status(400).json({ errors: errors.array() });
   }

   console.log(req.body);
   // Extract user details from request body
   const { fullname, email, password } = req.body;

   // Hash the user's password before saving (assuming hashPassword is defined in userModel)
   const hashedPassword = await userModel.hashPassword(password);

   const user = await userService.createUser({
      firstname:fullname.firstname,
      lastname:fullname.lastname,
      email,
      password: hashedPassword
   });

   const token = user.generateAuthToken();

   res.status(201).json({token, user })

   // ...existing code for creating and saving the user...
}
