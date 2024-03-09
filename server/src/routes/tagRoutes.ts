import { Router } from 'express';
import tagController from '../controllers/tagControllers';

const router = Router();

router.post('/', tagController.createTag);

export default router;
