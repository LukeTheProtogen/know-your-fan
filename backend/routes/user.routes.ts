import { Router } from 'express';
import { cadastrarUsuario } from '../controllers/user.controller';

const router = Router();

router.post('/', cadastrarUsuario); // POST /api/user/

export default router;
