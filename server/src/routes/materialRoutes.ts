import { Router } from 'express';
import { materialController } from '../controllers/materialControllers';

const router = Router();

router.post('/', materialController.handleFileUpload);
router.get('/', materialController.getFiles)


export default router;
