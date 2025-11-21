import 'dotenv/config';
import express from 'express';
import apiRouter from './routes/analyze.routes';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.json({ status: 'pong' });
});
app.use('/api', apiRouter);
export default app;
