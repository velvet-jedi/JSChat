require('dotenv').config();

const express = require('express');
const app = express();


const http = require('http').Server(app);
const io = require('socket.io')(http); // Initialize Socket.io

const router = require('./routes')(io); // import routes logic

const mongoose = require('mongoose');

io.on('connection', (socket) =>{
    socket.on('message', (message) => {
        console.log('New Message: ', message);
        io.emit('message', message);
    })
   })

// middleware that handles requests for static files.
app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the router for your messages routes
app.use('/', router);

const connectDB = url => {
    return mongoose.connect(url);
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
