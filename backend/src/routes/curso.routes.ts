import { Router } from 'express';
import * as cursoController from '../controllers/curso.controller';

export const cursoRouter = Router();

cursoRouter.get('/', cursoController.index);
cursoRouter.get('/:id', cursoController.show);
cursoRouter.post('/', cursoController.store);
cursoRouter.put('/:id', cursoController.update);
cursoRouter.patch('/:id', cursoController.update);
cursoRouter.delete('/:id', cursoController.destroy);
