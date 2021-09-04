import express from 'express';
import { loginRequest, registerRequest, logoutRequest } from '../controllers/authentication';

const router = express.Router();

router.post('/login', loginRequest);
router.post('/signup', registerRequest);
router.delete('/logout', logoutRequest);

export default router;