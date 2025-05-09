const friends = require('../models/friends');

function getFriends(req, res) {
  res.status(200).send(friends);
}

function getFriend(req, res) {
  const friendIndex = Number(req.prams.index);

  res.status(200).send(friends[friendIndex]);
}

function createFriend(req, res) {
  friends.push(req.body);
}

module.exports = {
  getFriends,
  getFriend,
  createFriend,
};
