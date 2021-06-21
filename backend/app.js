import express from 'express';
import logger from 'morgan'


const app = express();
const port = parseInt(process.env.PORT, 10) || 2021;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('*', (req, res) => res.status(200).send({
  message: 'A simple REST design',
}));


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

export default app;