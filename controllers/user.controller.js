
// Import user model for database operations
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model')

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

   const isUserAlreadyExist = await userModel.findOne({email});
   
   if(isUserAlreadyExist){
      return res.status(400).json({message:'User Already exist'});
   }

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


module.exports.loginUser = async(req,res,next)=>{
   const errors = validationResult(req);

   // Read this line as: "If there are any errors..."
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
   }

   const {email,password} = req.body;

   const user = await userModel.findOne({email}).select('+password');

   if(!user){
      return res.status(401).json({message: 'Invalid email or password'});
   }

   const isMatch = await user.comparePassword(password);

   if(!isMatch){
      return res.status(401).json({message:'Invalid email and password'});
   }

   const token = user.generateAuthToken();
      res.cookie('token',token);
   res.status(200).json({token, user});


}

module.exports.getUserProfile = async(req,res,next)=>{
   res.status(200).json(req.user)
}

module.exports.logoutUser = async(req,res,next)=>{
   res.clearCookie('token');

   const token = req.cookies.token || req.header.authorization.split()[1];
   await blacklistTokenModel.create({token})
   res.status(200).json({message:'Logged out'});
}