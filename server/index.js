require('dotenv/config');
const express = require('express');
const fetch = require('node-fetch');
const pg = require('pg');
const format = require('pg-format');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const authenticateUser = require('./authenticate-user');
const authorizationMiddleware = require('./authorization-middleware');

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
      const sql = `
        insert into "parks" ("parkCode", "parkName")
        values ($1, $2)
        on conflict ("parkCode")
        do nothing;
      `;
      const params = [parkCode, park.fullName];
      return db.query(sql, params)
        .then(result => {
          res.json(park);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/parks/itinerariesById/:itineraryId', (req, res, next) => {
  const itineraryId = parseInt(req.params.itineraryId);
  const sql = `
    select "thingToDo", "completed", "parkName", "itineraryItemId"
      from "itineraryItems"
      join "itineraries" using ("itineraryId")
      join "parks" using ("parkCode")
      where "itineraryId" = $1
  `;
  const params = [itineraryId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/reviews/:parkCode', (req, res, next) => {
  const parkCode = req.params.parkCode;
  const sql = `
    select "content", "parkName", "userFullName"
      from "reviews"
      join "parks" using ("parkCode")
      join "users" using ("userId")
      where "parkCode" = $1
  `;
  const params = [parkCode];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/reviews', (req, res, next) => {
  const sql = `
    select "parkName", "parkCode"
      from "reviews"
      join "parks" using ("parkCode")
      group by "parkName", "parkCode"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/sign-up', (req, res, next) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    throw new ClientError(400, 'username, password, and name are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("userFullName", "username", "hashedPassword")
        values ($1, $2, $3)
        on conflict ("username")
        do nothing
        returning "userId"
      `;
      const params = [name, username, hashedPassword];
      return db.query(sql, params)
        .then(result => {
          const [userId] = result.rows;
          if (!userId) {
            throw new ClientError(400, 'the username you entered cannot be used');
          }
          return authenticateUser(username, password, db)
            .then(result => {
              res.status(201).json(result);
            });
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  authenticateUser(username, password, db)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

app.use(authorizationMiddleware);

app.post('/api/parks/itineraries', (req, res, next) => {
  const { parkCode } = req.body;
  const { userId } = req.user;
  const sql = `
    insert into "itineraries" ("userId", "parkCode")
    values ($1, $2)
    returning "itineraryId"
  `;
  const params = [userId, parkCode];
  db.query(sql, params)
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
        });
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/parks/itineraries', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "parkName", "itineraryId"
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
});

app.post('/api/reviews', (req, res, next) => {
  const { parkCode, content } = req.body;
  const { userId } = req.user;
  const sql = `
        insert into "reviews" ("userId", "parkCode", "content")
        values ($1, $2, $3)
      `;
  const params = [userId, parkCode, content];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/visited/:parkCode', (req, res, next) => {
  const parkCode = req.params.parkCode;
  const { userId } = req.user;
  const sql = `
    select "parkCode"
      from "visited"
      where "parkCode" = $1
      and "userId" = $2
  `;
  const params = [parkCode, userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/visited', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select "parkCode", "parkName"
      from "visited"
      join "parks" using ("parkCode")
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
});

app.post('/api/visited/:parkCode', (req, res, next) => {
  const parkCode = req.params.parkCode;
  const { userId } = req.user;
  const sql = `
        insert into "visited" ("userId", "parkCode")
        values ($1, $2)
      `;
  const params = [userId, parkCode];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      next(err);
    });
});

app.patch('/api/parks/itineraries/:itineraryItemId', (req, res, next) => {
  const itineraryItemId = parseInt(req.params.itineraryItemId);
  const { completed } = req.body;
  const sql = `
    update "itineraryItems"
       set "completed" = $1
     where "itineraryItemId" = $2
     returning *
  `;
  const params = [completed, itineraryItemId];
  db.query(sql, params)
    .then(result => {
      const [itineraryItem] = result.rows;
      res.json(itineraryItem);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
