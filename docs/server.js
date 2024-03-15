require("dotenv").config();

const express = require("express");
const app = express(); // initialize an express app

const http = require("http").Server(app); // creates an HTTP server using the http module and binds it to the Express app
const io = require("socket.io")(http); // imports the Socket.io library and creates an instance that is tied to the HTTP server

const router = require("./routes")(io); // Passing io as an argument potentially allows the router to interact with Socket.io events.

const mongoose = require("mongoose");

// Establishes a listener for the 'connection' event emitted by Socket.io
io.on("connection", socket => {
    // sets up a listener on the socket object for the 'message' event.
    socket.on("message", message => {
        // broadcasts the received message to all connected clients using the 'message' event
        io.emit("message", message);
    });
});

// using express' static middleware that handles requests for static files.
app.use(express.static(__dirname)); // serve static HTML, JS etc files from the current directory

// parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the router for your messages routes
app.use("/", router);

const connectDB = url => {
    // arrow function takes URL to connect
    return mongoose.connect(url); // returns a promise object
    // By returning the Promise object,
    // the function allows for handling the connection outcome (success or failure) asynchronously.
};
const port = process.env.PORT || 3100;

var start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); // go to the next line of code only after the execution this promise has settled
        http.listen(port, console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};
start();
