import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import ClienteController from './app/controllers/ClienteController';
import AparelhoController from './app/controllers/AparelhoController';
import OrdemServicoController from './app/controllers/OrdemServicoController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';

const router = new Router();

router.post('/users', validateUserStore, UserController.store);
router.post('/session', SessionController.store);

// validação de token
router.use(authMiddleware);

router.put('/users', validateUserUpdate, UserController.update);
router.delete('/users/:id', UserController.delete);

router.get('/cliente', ClienteController.list);
router.post('/cliente', ClienteController.store);
router.put('/cliente', ClienteController.update);
router.delete('/cliente/:id', ClienteController.delete);

router.get('/aparelho', AparelhoController.list);
router.post('/aparelho', AparelhoController.store);
router.put('/aparelho', AparelhoController.update);
router.delete('/aparelho/:id', AparelhoController.delete);

router.get('/ordem-servico', OrdemServicoController.list);
router.post('/ordem-servico', OrdemServicoController.store);
router.put('/ordem-servico', OrdemServicoController.update);
router.delete('/ordem-servico/:id', OrdemServicoController.delete);

export default router;
