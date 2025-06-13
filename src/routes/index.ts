import { Router } from 'express';
import { login,  register } from '../controllers/authController';
import { verifyApikey } from '../middlewares/verifyApikey';

const router = Router();

router.post('/auth/login', verifyApikey, login);
router.post('/auth/register', verifyApikey, register);

export default router;