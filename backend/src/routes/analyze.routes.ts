import { Router } from 'express';
import multer from 'multer';
import { analyzeController } from '../controllers/analyze.controller';

const router = Router();
const uploadFile = multer({ storage: multer.memoryStorage() });

/**
 * Route to analyze an image.
 * Expects a multipart/form-data request with an 'file' file field.
 */
router.post('/analyze', handleFileMulter, (req, res, ) => {
    analyzeController.handleAnalyze(req, res);
});

function handleFileMulter(req: any, res: any, next: any) {
    const middleware = uploadFile.single('file');

    middleware(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({
                    message: 'Only one file is allowed in the "file" field',
                });
            }

            return res.status(400).json({
                message: err.message,
            });
        }

        if (err) {
            return res.status(500).json({
                message: 'Error processing uploaded file',
            });
        }

        return next();
    });
}
export default router;
