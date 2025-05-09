const express = require('express');
const { getFriends, createFriend } = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.get('/', getFriends);
friendsRouter.post('/', createFriend);

module.exports = friendsRouter;
