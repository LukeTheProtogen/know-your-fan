import { Router } from 'express';
import { uploadDocumento, upload } from '../controllers/document.controller';

const router = Router();

router.post('/upload', upload.single('documento'), uploadDocumento); // POST /api/documento/upload

export default router;
