import Queue from 'bull';

const REDIS_DSN = process.env.REDIS_DSN || 'redis://redis:6379?db=0';

const someQueue = new Queue('some', REDIS_DSN);

process.on('SIGINT', async (sig) => {
  console.log('__SIG__', sig);
  await someQueue.close();
  process.exit(0);
});

someQueue.process((job, done) => {
  const {
    id
  } = job;
  console.log(`${id}: START`);

  setTimeout(() => {
    console.log(`${id}: DONE`);
    done();
  }, Math.random() * 5000);
});
