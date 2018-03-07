/**
 * Require Modules
 */
const express = require('express');
const request = require('request');

const app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/github-follower', (req, res) => {
  const options = {
    url: 'https://api.github.com/users/' + req.query.accountName + '/followers',
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function (error, response, body) {
    res.send(body);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));