import { Router } from 'express';
import tagController from '../controllers/tagControllers';

const router = Router();

router.post('/', tagController.createTag);
router.get('/check/:name', tagController.checkTagExists);
router.get('/parent', tagController.getParentTags);
router.get('/course/:name', tagController.getTagIdByName);
router.get('/modules', tagController.getModules);

export default router;
