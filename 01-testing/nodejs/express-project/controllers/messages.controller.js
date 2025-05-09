const path = require('path');

function getMessages(req, res) {
  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'));
  res.render('messages', { friend: 'James' });
}

function postMessage(req, res) {
  console.log('Updating messages...');
}

module.exports = {
  getMessages,
  postMessage,
};
