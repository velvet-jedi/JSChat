const express = require('express');
const router = express.Router();
var Message = require('./message'); // model import

// express route to get all the message from database
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
        res.status(200).send('Message sent successfully');
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
