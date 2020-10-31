import { Router } from 'express';

import millsRouter from './mills.routes';
import harvestsRouter from './harvests.routes';
import farmsRouter from './farms.routes';
import fieldsRouter from './fields.routes';

const routes = Router();

routes.use('/mills', millsRouter);
routes.use('/harvests', harvestsRouter);
routes.use('/farms', farmsRouter);
routes.use('/fields', fieldsRouter);

export default routes;
