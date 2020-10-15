import { Router } from 'express';

import OrphanagesController from './controllers/OrphanagesController';

const orphanagesController = new OrphanagesController();

const routes = Router();

routes.post('/', orphanagesController.create);

export default routes;
