import { Router } from 'express';

import millController from '../app/controllers/MillController';

const millRouter = Router();

millRouter.get('/', millController.show);
millRouter.get('/:id', millController.index);
millRouter.post('/', millController.store);
millRouter.put('/:id', millController.update);
millRouter.delete('/:id', millController.destroy);

export default millRouter;
