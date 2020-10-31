import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import { setupWebsocket } from './websocket';

dotenv.config();
const server = http.createServer(app);
setupWebsocket(server);

// setupWebsocket(server);
server.listen(process.env.PORT, () => console.log('Server started'));
