
// Import the user model to interact with the users collection in the database
const userModel = require('../models/user.model');


// Service function to create a new user
module.exports.createUser = async ({firstname, lastname, email, password}) => {
    // Check for required fields
    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }

    // Create a new user document in the database
    const user = await userModel.create({
        fullname: {
            firstname, // User's first name
            lastname   // User's last name
        },
        email,      // User's email
        password    // User's password
    })

    // Return the created user
    return user;
}