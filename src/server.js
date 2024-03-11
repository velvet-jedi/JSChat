require('dotenv').config();
var express = require('express');
var app = express();

var mongoose = require('mongoose');


// middleware that handles requests for static files.
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connectDB = (url) => {
    return mongoose.connect(url)
}

const port = process.env.PORT || 3000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) // go to the next line of code only after the execution this promise has settled
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()