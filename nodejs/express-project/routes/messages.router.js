const express = require('express');

const messagesRouter = express.Router();

messagesRouter.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <ul>
          <li>Hello Isacc!</li>
          <li>What are your thoughts on astronomy?</li>
        </ul>
      </body>
    </html
  `);
});

module.exports = messagesRouter;
