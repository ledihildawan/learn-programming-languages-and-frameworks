const express = require('express');
const { getMessages } = require('../controllers/messages.controller');

const messagesRouter = express.Router();

messagesRouter.get('/', getMessages);

module.exports = messagesRouter;
