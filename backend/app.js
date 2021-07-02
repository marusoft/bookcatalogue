import express from 'express';
import logger from 'morgan'

import userRouter from './server/Routes/user.routes';
import uploadRouter from './server/Routes/book.routes'

const app = express();
const port = parseInt(process.env.PORT, 10) || 2021;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1', userRouter);
app.use('/api/v1', uploadRouter)

app.get('/api/v1', (req, res) => res.status(200).send({
  message: 'A simple REST design for book catalogue',
}));

app.get('*', (req, res) => res.status(404).send({
  message: 'API not found',
}));


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

export default app;