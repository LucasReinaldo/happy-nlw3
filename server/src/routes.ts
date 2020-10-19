import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const orphanagesController = new OrphanagesController();

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', orphanagesController.index);
routes.get('/:id', orphanagesController.show);

// TODO: ensure that the images won't be upload in case of error
routes.post('/', upload.array('images'), orphanagesController.create);

export default routes;
