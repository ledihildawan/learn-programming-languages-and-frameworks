const https = require('https');
const username = 'chalkers';

function printMessage(username, profile, points) {
  return {
    ...arguments
  }
}

const request = https.get(`https://teamtreehouse.com/${username}.json`, res => {
  let body = '';
  res.on('data', data => body += data.toString());

  res.on('end', () => {
    const profile = JSON.parse(body);
    printMessage(username, profile.badges.length, profile.points.javascript);
    console.log(printMessage(username, profile.badges.length, profile.points.javascript))
  });
});