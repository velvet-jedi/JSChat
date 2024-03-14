const express = require('express');
const router = express.Router();
const Message = require('./message'); // model import


module.exports = (io) => {    // take io (presumably a socket.io instance) as an argument
    router.get('/messages', async (req, res) => {
        try {
            const messages = await Message.find({});
            res.send(messages);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    });

    // post new messages created by the user to the database
    router.post('/messages', async (req, res) => {
        const message = new Message(req.body);
        try {
            await message.save();
            res.status(200);
            io.emit('message', req.body);
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }
    });

    return router;
};