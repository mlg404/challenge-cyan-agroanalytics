import dotenv from 'dotenv';
import app from './app';
import setupWebsocket from './websocket';

dotenv.config();

const server = app.listen(process.env.PORT, () => {
  console.log('Server started');
  setupWebsocket(server);
});
