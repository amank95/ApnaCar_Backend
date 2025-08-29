
// Import captain model for database operations
const captainModel = require('../models/captain.model');

// Import captain service for business logic
const captainService = require('../services/captain.service');

// Import validationResult to handle validation errors from express-validator
const { validationResult }= require('express-validator');


// Controller function to handle captain registration
module.exports.registerCaptain = async (req, res, next) => {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If validation errors exist, return 400 Bad Request with error details
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password, vehicle}=req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        res.status(400).json({message:'Captain already exist'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color:vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        model:vehicle.model,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
    // ...existing code for registering a captain will go here...
}