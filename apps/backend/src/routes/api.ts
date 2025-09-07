import { Router } from 'express';
import {
  createWebsite,
  generateSuggestedDetails,
  generateContentSection,
  updateSectionContent,
  publishWebsite,
  chatBotMessage,
  getWebsite,
  getAllWebsites
} from '../controllers/websiteController';

const router = Router();

router.post('/createWebsite', createWebsite);
router.post('/generateSuggestedDetails', generateSuggestedDetails);
router.post('/generateContentSection', generateContentSection);
router.post('/updateSectionContent', updateSectionContent);
router.post('/publishWebsite', publishWebsite);
router.post('/chatBotMessage', chatBotMessage);
router.get('/website/:id', getWebsite);
router.get('/websites', getAllWebsites);

export default router;