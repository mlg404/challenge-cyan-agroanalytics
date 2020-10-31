import { Router } from 'express';

import farmController from '../app/controllers/FarmController';

const farmRouter = Router();

farmRouter.get('/', farmController.show);
farmRouter.get('/:id', farmController.index);
farmRouter.post('/', farmController.store);
farmRouter.put('/:id', farmController.update);
farmRouter.delete('/:id', farmController.destroy);

export default farmRouter;
