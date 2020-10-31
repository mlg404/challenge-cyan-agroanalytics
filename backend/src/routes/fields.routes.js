import { Router } from 'express';

import fieldController from '../app/controllers/FieldController';

const fieldRouter = Router();

fieldRouter.get('/', fieldController.show);
fieldRouter.get('/:id', fieldController.index);
fieldRouter.post('/', fieldController.store);
fieldRouter.put('/:id', fieldController.update);
fieldRouter.delete('/:id', fieldController.destroy);

export default fieldRouter;
