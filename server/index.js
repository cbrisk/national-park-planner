require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const errorMiddleware = require('./error-middleware');

const app = express();

app.get('/api/parks', (req, res, next) => {
  fetch(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.API_KEY}`, { headers: { 'User-Agent': 'Chaim' } })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

app.get('/api/parks/:state', (req, res, next) => {
  const state = req.params.state;
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=500&api_key=${process.env.API_KEY}`, { headers: { 'User-Agent': 'Chaim' } })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
