import { Router } from 'express';
import DemoController from '@/controllers/DemoController';

const router = Router();

router.post('/demos', DemoController.create);
router.get('/demos/:id', DemoController.getById);
router.get('/demos', DemoController.getAll);
router.put('/demos/:id', DemoController.update);
router.delete('/demos/:id', DemoController.delete);

export default router;
