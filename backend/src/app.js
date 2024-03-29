import express from 'express';
import cors from 'cors';
import './database';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
