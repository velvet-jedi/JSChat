require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routes'); // Adjust the path accordingly



const mongoose = require('mongoose');

// middleware that handles requests for static files.
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the router for your messages routes
app.use('/', router);


const connectDB = (url) => {
    return mongoose.connect(url)
}
const port = process.env.PORT || 3100;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) // go to the next line of code only after the execution this promise has settled
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()