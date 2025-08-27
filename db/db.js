
// Import mongoose library to interact with MongoDB
const mongoose  = require('mongoose');

// Get MongoDB connection URL from environment variables
const mongoDbUrl = process.env.DB_CONNECT;


// Function to connect to MongoDB
const connectToDb = () => {
	// Connect to MongoDB using mongoose
	mongoose.connect(mongoDbUrl)
		// If connection is successful, log message
		.then(() => console.log('connected to DB'))
		// If connection fails, log error
		.catch(err => console.log(err));
}


// Export the connect function so it can be used in other files
module.exports = connectToDb;