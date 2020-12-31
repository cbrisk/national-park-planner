require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const pg = require('pg');
const format = require('pg-format');
const errorMiddleware = require('./error-middleware');

const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/api/parks', (req, res, next) => {
  fetch(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${process.env.API_KEY}`, { headers: { 'User-Agent': 'Chaim' } })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

app.get('/api/parks/stateCode/:state', (req, res, next) => {
  const state = req.params.state;
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=500&api_key=${process.env.API_KEY}`, { headers: { 'User-Agent': 'Chaim' } })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

app.get('/api/parks/parkCode/:parkCode', (req, res, next) => {
  const parkCode = req.params.parkCode;
  fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&limit=500&api_key=${process.env.API_KEY}`, { headers: { 'User-Agent': 'Chaim' } })
    .then(response => response.json())
    .then(data => {
      const [park] = data.data;
      res.json(park);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/parks/itineraries', (req, res, next) => {
  const { parkCode, parkName } = req.body;
  const sql = `
    insert into "parks" ("parkCode", "parkName")
    values ($1, $2)
    on conflict ("parkCode")
    do nothing;
  `;
  const params = [parkCode, parkName];
  db.query(sql, params)
    .then(result => {
      const userId = parseInt(req.body.userId);
      const sql = `
        insert into "itineraries" ("userId", "parkCode")
        values ($1, $2)
        returning "itineraryId"
      `;
      const params = [userId, parkCode];
      return db.query(sql, params)
        .then(result => {
          const { itineraryId } = result.rows[0];
          const { itinerary } = req.body;
          const newItinerary = itinerary.map(itineraryItem => {
            return [itineraryId, itineraryItem, false];
          });
          const sql = format('insert into "itineraryItems" ("itineraryId", "thingToDo", "completed") VALUES %L', newItinerary);

          return db.query(sql)
            .then(result => {
              res.sendStatus(201);
            })
        })
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/parks/itineraries/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const sql = `
    select "parkName"
      from "parks"
      join "itineraries" using ("parkCode")
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
