
// Starting point for the backend

// Import the built-in http module
const http = require('http');

// Import the Express app
const app = require('./app');

// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`server is running ${port}`);
});

