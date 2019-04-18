import express from 'express';
import bodyParser from 'body-parser';
import Queue from 'bull';
import {
  createServer
} from 'http';

const PORT = process.env.PORT || 3000;
const REDIS_DSN = process.env.REDIS_DSN || 'redis://redis:6379?db=0';

const someQueue = new Queue('some', REDIS_DSN);

const app = express();
const server = createServer(app);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({
  message: 'Hello from Server'
}));

app.get('/env', (req, res) => res.json(process.env));

app.post('/task', async (req, res) => {
  const job = await someQueue.add({});
  const {
    id
  } = job;
  console.log(id);

  return res.sendStatus(201);
});

server.listen(PORT, () => console.log(`Listen on: http://0.0.0.0:${PORT}`));

process.on('SIGINT', (sig) => {
  console.log('__SIG__', sig);

  server.close(async () => {
    await someQueue.close();
    process.exit(0);
  });
});
