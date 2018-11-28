const http = require('http');
const pgp = require('pg-promise')();

const PORT = process.env.PORT || 3000;
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'secret';
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_DB = process.env.POSTGRES_DB || 'postgres';
const PG_CONN = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

console.log(`Connect to running Postgres instance from your host using:

  Host: ${POSTGRES_HOST}
  Port: ${POSTGRES_PORT}
  Database Name: ${POSTGRES_DB}
  Username: ${POSTGRES_USER}
  Password: ${POSTGRES_PASSWORD}

Connect to running Postgres instance using docker compose:

  docker-compose exec pg psql -U ${POSTGRES_USER} ${POSTGRES_DB}

`)

const db = pgp(PG_CONN);

http.createServer((req, res) => {

  const op1 = 2;
  const op2 = 3;

  db.query('SELECT $1 + $2 answer', [ op1, op2 ])
    .then(([ result ]) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`${op1} + ${op2} = ${result.answer}`);
    })
    .catch(error => {
      console.error('DB Query Error', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Error.');
    });

}).listen(PORT, () => console.log(`Server listening on ${PORT}`));
