require('dotenv').config();

const PORT = 8888;

const express = require('express');

const app = express();

const {
  REDIRECT_URI,
  CLIENT_ID: client_id,
  CLIENT_SECRET: redirect_uri,
} = process.env;

const stateKey = "spotify_auth_state";

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function generateRandomString(length) {
  let text = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXWZabcdefghijklmnopqrtsuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += characters[getRandomIndex(characters.length)];
  }

  return text;
}

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  res.cookie(stateKey, state);

  const searchParams = new URLSearchParams({
    state,
    scope,
    client_id,
    redirect_uri,
    response_type: 'code',
  });

  res.redirect(`https://accounts.spotify.com/authorize?${searchParams.toString()}`);
});

app.get("/callback", (req, res) => {
  res.send("callback");
});

app.listen(PORT, () => {
  console.log(`Express app listening at http://localhost:${PORT}/`);
});