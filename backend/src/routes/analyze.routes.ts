import { Router } from 'express';
import multer from 'multer';
import { analyzeController } from '../controllers/analyze.controller';

const router = Router();
const uploadFile = multer({ storage: multer.memoryStorage() });

/**
 * Route to analyze an image.
 * Expects a multipart/form-data request with an 'image' file field.
 */
router.post('/analyze', uploadFile.single('image'), (req, res) => {
  analyzeController.handleAnalyze(req, res);
});

export default router;
