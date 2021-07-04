import express from 'express';
import logger from 'morgan';
import redis from 'redis'

import userRouter from './server/Routes/user.routes';
import bookRouter from './server/Routes/book.routes'

const app = express();
const port = parseInt(process.env.PORT, 10) || 2021;

app.use(logger('dev'));


export const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', () => {
   console.log('Redis client connected');
})
redisClient.on('error', (err) => {
   console.log('Something went wrong ' + err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1', userRouter);
app.use('/api/v1', bookRouter);

app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'A simple REST design for book catalogue',
}));

app.get('*', (req, res) => res.status(404).send({
  message: 'API not found',
}));


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

export default app;