import { Router } from 'express';

import UserControllers from './app/controllers/UserControllers';
import SessionController from './app/controllers/SessionController';
import ProdutoController from './app/controllers/ProdutoController';

// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/produtos', ProdutoController.index);
routes.get('/produtos/:id', ProdutoController.show);
routes.post('/users', UserControllers.store);
routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);
routes.put('/users', UserControllers.update);
routes.post('/produtos', ProdutoController.store);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

export default routes;
