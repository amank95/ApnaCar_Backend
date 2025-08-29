const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, 
    color, model, plate, capacity,vehicleType
})=>{
    if(!firstname || !email || !password || !color || !capacity || !vehicleType){
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname,
            
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType,
            model
        }
    })
    return captain;
}