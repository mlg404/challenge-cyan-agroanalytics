import { Router } from 'express';

import harvestController from '../app/controllers/HarvestController';

const harvestRouter = Router();

harvestRouter.get('/', harvestController.show);
harvestRouter.get('/:id', harvestController.index);
harvestRouter.post('/', harvestController.store);
harvestRouter.put('/:id', harvestController.update);
harvestRouter.delete('/:id', harvestController.destroy);

export default harvestRouter;
