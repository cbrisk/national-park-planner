require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error'); // eslint-disable-line
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/parks', (req, res, next) => {
  fetch('https://developer.nps.gov/api/v1/parks?limit=500&api_key=iIb41q7SpeNVydFcxXQZtBqE2IuRe9WTcy4WGqJz', { headers: { "User-Agent": "Chaim" }} )
    .then(response => response.json())
    .then(data => res.json(data))
    .catch (err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
