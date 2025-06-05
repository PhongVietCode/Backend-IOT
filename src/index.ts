import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import appRouter from './appRouter';
import { errorHandler } from './middlewares/errorHandler';
import { logRequest } from './middlewares/logger';
import cookieParser from 'cookie-parser'
import { runDeleteWebhook } from './utils/cronjob';

const app = express();
app.use(logRequest);
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

app.use("/api/v1", appRouter);

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  runDeleteWebhook()
  console.log(`Server is running on port ${PORT}`);
});
process.on('SIGTERM', async () => {
  process.exit(0);
});