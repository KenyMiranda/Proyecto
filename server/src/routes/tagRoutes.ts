import { Router } from 'express';
import tagController from '../controllers/tagControllers';

const router = Router();

router.post('/', tagController.createTag);
router.get('/check/:name', tagController.checkTagExists);

export default router;
