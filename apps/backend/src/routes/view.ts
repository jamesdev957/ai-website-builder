import { Router } from 'express';
import { viewWebsite } from '../controllers/viewController';

const router = Router();

router.get('/:websiteId', viewWebsite);

export default router;